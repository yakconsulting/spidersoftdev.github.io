---
title: "External Authorization for Your Web Apps"
author: admin
type: post
date: 2026-02-13T10:00:00+02:00
lead: "Eliminate custom login code by offloading authentication to a reverse proxy that passes trusted identity headers directly to your Go or PHP apps."
categories: ["DevOps"]
description: "Secure your web applications without building login forms. Learn the external authorization pattern using reverse proxies (Caddy, Nginx, Traefik) to manage sessions and inject trusted user headers into your backend."
thumbnail: /images/2026/external-auth.webp
---
You've got a Go API. Or a PHP app. Or both. And you need to protect them. The instinct is to reach for a library, bolt on JWT handling, wire up a database for sessions, and build yet another login form. But there's a better way — one that separates authentication from your application entirely.

External authorization systems sit in front of your app, handle the messy parts (login flows, MFA, session management), and pass you clean, trusted headers with user information. Your app just reads them. That's it.

Let's walk through how this works, what tools are available, and how to actually implement it in Go and PHP.

## The Core Idea

The pattern is straightforward. A reverse proxy (Caddy, Nginx, Traefik) receives every incoming request. Before forwarding it to your application, it asks an external authorization service: "Is this user allowed in?"

If the answer is yes, the auth service responds with HTTP headers containing user details — username, email, groups. The proxy injects those headers into the request and forwards it to your backend. If the answer is no, the user gets redirected to a login page.

Your application never sees unauthenticated traffic. It never manages passwords. It just reads headers.

```
Client → Reverse Proxy → Auth Service (Authelia, Authentik, etc.)
                ↓                      ↓
           (if 200 OK)          (if 401/302)
                ↓                      ↓
         Your App (with          Login Portal
         trusted headers)
```

## The Headers You'll Work With

Regardless of which authorization system you choose, the headers follow a common convention:

| Header | Description | Example |
|---|---|---|
| `Remote-User` | Username or unique identifier | `john` |
| `Remote-Email` | User's email address | `john@example.com` |
| `Remote-Name` | Display name | `John Doe` |
| `Remote-Groups` | Comma-separated group list | `admins,developers` |

Some systems add extra headers or use slightly different names, but this is the baseline you can expect.

## Authelia: The Lightweight Contender

[Authelia](https://www.authelia.com/) is an open-source authentication and authorization server written in Go. It's tiny — under 20 MB compressed, under 30 MB of RAM in use — and fast. It supports TOTP, WebAuthn, push notifications, and full OpenID Connect 1.0.

For trusted header SSO, Authelia works as a forward-auth companion to your reverse proxy. Here's a minimal Caddy setup:

### Caddy + Authelia Configuration

```
app.example.com {
    forward_auth authelia:9091 {
        uri /api/authz/forward-auth
        copy_headers Remote-User Remote-Groups Remote-Email Remote-Name
    }
    reverse_proxy your-app:8080
}
```

Caddy sends every request to Authelia's `/api/authz/forward-auth` endpoint first. If the user is authenticated, Authelia returns 200 with the identity headers. Caddy copies those headers and passes them to your backend. If not, the user gets redirected to the Authelia login portal.

The Authelia side needs a matching configuration:

```yaml
# authelia configuration.yml (relevant parts)
access_control:
  default_policy: two_factor
  rules:
    - domain: app.example.com
      policy: two_factor
      subject:
        - 'group:developers'

session:
  cookies:
    - domain: example.com
      authelia_url: https://auth.example.com
```

## Authentik: The Feature-Rich Alternative

[Authentik](https://goauthentik.io/) is a more full-featured identity provider. It comes with a proper admin UI, user management, LDAP integration, and support for SAML and OAuth in addition to forward-auth proxy mode. It's heavier than Authelia but gives you more out of the box if you need it.

The proxy integration works the same way. You configure your reverse proxy to check with Authentik before forwarding requests, and Authentik returns the same style of trusted headers.

With Caddy, the setup looks similar:

```JSON
app.example.com {
    forward_auth authentik-server:9000 {
        uri /outpost.goauthentik.io/auth/caddy
        copy_headers X-Authentik-Username X-Authentik-Groups X-Authentik-Email X-Authentik-Name
    }
    reverse_proxy your-app:8080
}
```

Note the different header names — Authentik prefixes everything with `X-Authentik-`. Your backend code needs to account for whichever system you're running.

## Nginx + Vouch Proxy: The DIY Approach

If you're on Nginx and don't want to commit to a full identity provider, [Vouch Proxy](https://github.com/vouch/vouch-proxy) is a lightweight option. It delegates authentication to any OAuth/OIDC provider (Google, GitHub, Keycloak) and passes the result back via headers.

```nginx
server {
    listen 443 ssl;
    server_name app.example.com;

    # Auth subrequest
    auth_request /validate;
    auth_request_set $auth_user $upstream_http_x_vouch_user;
    auth_request_set $auth_email $upstream_http_x_vouch_idp_claims_email;

    # Forward to backend with user info
    proxy_set_header Remote-User $auth_user;
    proxy_set_header Remote-Email $auth_email;

    location = /validate {
        internal;
        proxy_pass http://vouch:9090/validate;
        proxy_pass_request_body off;
        proxy_set_header Content-Length "";
    }

    location / {
        proxy_pass http://your-app:8080;
    }
}
```

This gives you the same end result. Your app gets headers; it doesn't care where they came from.

## Reading Trusted Headers in Go

Here's a practical middleware for a Go application. It extracts user information from trusted headers and makes it available through the request context.

```go
package auth

import (
	"context"
	"net/http"
	"strings"
)

type User struct {
	Username string
	Email    string
	Name     string
	Groups   []string
}

type contextKey string

const userContextKey contextKey = "auth_user"

// TrustedHeaderAuth is middleware that reads identity headers
// set by a reverse proxy (Authelia, Authentik, etc.)
func TrustedHeaderAuth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		username := r.Header.Get("Remote-User")
		if username == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		user := &User{
			Username: username,
			Email:    r.Header.Get("Remote-Email"),
			Name:     r.Header.Get("Remote-Name"),
		}

		if groups := r.Header.Get("Remote-Groups"); groups != "" {
			user.Groups = strings.Split(groups, ",")
		}

		ctx := context.WithValue(r.Context(), userContextKey, user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// UserFromContext retrieves the authenticated user from the request context.
func UserFromContext(ctx context.Context) *User {
	user, _ := ctx.Value(userContextKey).(*User)
	return user
}

// RequireGroup returns middleware that checks group membership.
func RequireGroup(group string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			user := UserFromContext(r.Context())
			if user == nil {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}
			for _, g := range user.Groups {
				if strings.TrimSpace(g) == group {
					next.ServeHTTP(w, r)
					return
				}
			}
			http.Error(w, "Forbidden", http.StatusForbidden)
		})
	}
}
```

Usage is clean:

```go
func main() {
	mux := http.NewServeMux()

	// Public health check (no auth needed, proxy should bypass this)
	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("ok"))
	})

	// Protected routes
	protected := http.NewServeMux()
	protected.HandleFunc("/dashboard", dashboardHandler)
	protected.HandleFunc("/profile", profileHandler)

	// Admin-only routes
	admin := http.NewServeMux()
	admin.HandleFunc("/admin/users", usersHandler)

	mux.Handle("/", auth.TrustedHeaderAuth(protected))
	mux.Handle("/admin/", auth.TrustedHeaderAuth(
		auth.RequireGroup("admins")(admin),
	))

	// Listen only on localhost — proxy handles external traffic
	http.ListenAndServe("127.0.0.1:8080", mux)
}

func dashboardHandler(w http.ResponseWriter, r *http.Request) {
	user := auth.UserFromContext(r.Context())
	fmt.Fprintf(w, "Hello, %s (%s)", user.Name, user.Email)
}
```

## Reading Trusted Headers in PHP

The same pattern in PHP. Headers arrive as `$_SERVER` variables with an `HTTP_` prefix and dashes converted to underscores.

### Simple Procedural Approach

```php
<?php

function getAuthUser(): ?array
{
    $username = $_SERVER['HTTP_REMOTE_USER'] ?? '';

    if (empty($username)) {
        return null;
    }

    return [
        'username' => $username,
        'email'    => $_SERVER['HTTP_REMOTE_EMAIL'] ?? '',
        'name'     => $_SERVER['HTTP_REMOTE_NAME'] ?? '',
        'groups'   => array_filter(
            array_map('trim', explode(',', $_SERVER['HTTP_REMOTE_GROUPS'] ?? ''))
        ),
    ];
}

function requireAuth(): array
{
    $user = getAuthUser();

    if ($user === null) {
        http_response_code(401);
        echo 'Unauthorized';
        exit;
    }

    return $user;
}

function requireGroup(string $group): array
{
    $user = requireAuth();

    if (!in_array($group, $user['groups'], true)) {
        http_response_code(403);
        echo 'Forbidden';
        exit;
    }

    return $user;
}

// Usage
$user = requireAuth();
echo "Welcome, {$user['name']}";
```

### Laravel Middleware

If you're running Laravel, a proper middleware keeps things tidy:

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class TrustedHeaderAuth
{
    public function handle(Request $request, Closure $next, ?string $requiredGroup = null)
    {
        $username = $request->header('Remote-User');

        if (empty($username)) {
            abort(401, 'Unauthorized');
        }

        $groups = array_filter(
            array_map('trim', explode(',', $request->header('Remote-Groups', '')))
        );

        if ($requiredGroup && !in_array($requiredGroup, $groups, true)) {
            abort(403, 'Forbidden');
        }

        // Make user info available throughout the request
        $request->merge([
            'auth_user' => [
                'username' => $username,
                'email'    => $request->header('Remote-Email', ''),
                'name'     => $request->header('Remote-Name', ''),
                'groups'   => $groups,
            ],
        ]);

        return $next($request);
    }
}
```

Register it in your kernel and use it in routes:

```php
// routes/web.php
Route::middleware('trusted-header-auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});

Route::middleware('trusted-header-auth:admins')->group(function () {
    Route::get('/admin', [AdminController::class, 'index']);
});
```

## Security: The Part You Can't Skip

Trusted headers are powerful precisely because they're simple. But that simplicity is also a risk. If anyone can reach your app directly — bypassing the proxy — they can forge any header they want. There's no signature, no token, no verification. The trust is entirely based on network topology.

Here's what you need to get right:

**Never expose your app to the internet directly.** Bind to `127.0.0.1` or an internal Docker network. If you're using Docker, don't publish ports — let only the reverse proxy reach the container.

**Lock down the source.** If you can't fully isolate the network, validate the connecting IP. Only accept trusted headers from your proxy's IP address.

```go
// Go: Validate source IP before trusting headers
func TrustedProxyOnly(proxyIP string, next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        host, _, _ := net.SplitHostPort(r.RemoteAddr)
        if host != proxyIP {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

**Strip incoming headers at the proxy level.** Make sure your reverse proxy removes any `Remote-User`, `Remote-Email`, etc. headers from the original client request before adding the ones from the auth service. Caddy's `forward_auth` does this automatically. Nginx and Traefik need explicit configuration.

## When to Use Trusted Headers vs. OIDC

Trusted headers are ideal when your app sits behind a single reverse proxy and doesn't need to make authenticated calls to other services. It's the simplest integration possible — no libraries, no token management, no refresh flows.

Go with OpenID Connect when your app needs to work across multiple domains, when you're building a public-facing SaaS, or when the app itself needs to act on behalf of the user (calling third-party APIs with delegated tokens, for example). Both Authelia and Authentik support OIDC, so you can always upgrade later without changing your auth provider.

For most self-hosted setups and internal tools, trusted headers are the pragmatic choice. Start there. Add complexity only when you actually need it.
