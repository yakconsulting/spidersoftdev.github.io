---
title: TOTP security tokens and 2-Step Verification
author: admin
type: post
date: 2015-07-07T05:37:35+00:00
url: /2015/totp-security-tokens-and-2-step-verification/
nkweb_code_in_head:
  - default
nkweb_Use_Custom_js:
  - default
nkweb_Use_Custom_Values:
  - default
nkweb_Use_Custom:
  - 'false'
dsq_thread_id:
  - 3958868806
categories:
  - Open Source
tags:
  - golang
  - oauth

---
**Time-based One-time Password Algorithm** (**TOTP**) is an algorithm that computes a [one-time password][1] from a [shared secret key][2] and the current time. The most popular implementation of this solution is **Google Authenticator.**

This application that implements [TOTP][3] [security tokens][4]. Usually is branded as &#8220;[Two-step verification][5]{.mw-redirect}&#8221; (or 2-Step Verification). Authenticator provides a six- to eight-digit [one-time password][1] which users must provide in addition to their username and password to log into various services or other sites.

<!--more-->

You can use it on [iPhone][6] or [Android][7] and obviously you are note forced to use it all. There are plenty of other solutions like <a href="http://www.nongnu.org/oath-toolkit/" target="_blank">OATH Toolkit</a> &#8211; just install it via brew `brew install oauth-toolkit` and then generate token using command line `oathtool --totp -b yourkeyhere`. Or if you are fan of go &#8211; you can use this library <a href="https://github.com/vbatts/go-google-authenticator" target="_blank">go-google-authenticator</a>.

There is a plenty of other solutions &#8211; even for smartwatches like <a href="http://www.connectedly.com/how-get-your-two-step-verification-codes-your-pebble" target="_blank">Pebble time</a>. Obviously except big players using 2-step verification you also impelement your own quite easly using libraries like <a href="https://github.com/PHPGangsta/GoogleAuthenticator" target="_blank">GoogleAuthenticator</a> or  https://github.com/PHPGangsta/GoogleAuthenticator

 [1]: https://en.wikipedia.org/wiki/One-time_password "One-time password"
 [2]: https://en.wikipedia.org/wiki/Shared_secret "Shared secret"
 [3]: https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm "Time-based One-time Password Algorithm"
 [4]: https://en.wikipedia.org/wiki/Security_token#Mobile_device_tokens "Security token"
 [5]: https://en.wikipedia.org/wiki/Two-step_verification "Two-step verification"
 [6]: http://itunes.apple.com/app/google-authenticator/id388497605?mt=8
 [7]: https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2