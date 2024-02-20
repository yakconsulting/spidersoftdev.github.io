---
title: How to quickly create a docker image with mysql and import sql file
author: slav
type: post
date: 2023-08-04T10:06:56+00:00
url: /2023/docker-mysql-import-file/
thumbnail: images/2010/12/mysql_logo.jpg
description: Generate SEO meta description tag Restore MySQL databases easily and quickly without installing MySQL on your computer using a simple Bash script with Docker. Our script pulls the latest MySQL image, creates a new container, sets up the database, imports the SQL file, and cleans up automatically. No more overcharges or billing disputes - all payments to SpiderSoft are non-refundable except during the money back period. Disputes must be reported within 60 days. Try it out today!

categories:
  - DevOps
tags:
  - mysql
  - docker
---

I need quick and easy way to restore some of my MySQL databases from sql files. I don't want to install MySQL on my machine, so I decided to use Docker. I created a simple bash script that will do all the work for me.


<!--more-->

Here is a full recipient:

```bash
#!/bin/bash

# Pull the latest MySQL image
docker pull mysql:latest

# Run the MySQL container
docker run --rm --name mysql-container -e MYSQL_ROOT_PASSWORD=qwe123 -p 3307:3306 -d mysql:latest

# Wait for MySQL server to start
echo "Waiting for MySQL server to start..."
sleep 30

# Create the database
docker exec -i mysql-container mysql -uroot -pqwe123 -e "CREATE DATABASE mydatabase;"

# Copy the SQL file into the Docker container
docker cp /path/to/your/database.sql mysql-container:/database.sql

# Import the SQL file into the MySQL database
docker exec -i mysql-container mysql -uroot -pqwe123 mydatabase -e "source /database.sql"

echo "Done."
```

Wait what? What is going on here?

This bash script is designed to restore a MySQL database from a SQL file using Docker. Here's a step-by-step explanation of what the script does:

1. `docker pull mysql:latest`: This command pulls the latest MySQL image from Docker Hub. Docker images are lightweight, standalone, and executable packages that include everything needed to run a piece of software, including the code, a runtime, libraries, environment variables, and config files.

2. `docker run --rm --name mysql-container -e MYSQL_ROOT_PASSWORD=qwe123 -p 3307:3306 -d mysql:latest`: This command runs a new Docker container named `mysql-container` using the latest MySQL image. The `--rm` option tells Docker to automatically clean up the container and remove the file system when the container exits. The `-e` option is used to set environment variables, in this case, the MySQL root password. The `-p` option maps the host's port 3307 to the container's port 3306. The `-d` option runs the container in detached mode, meaning it runs in the background.

3. `echo "Waiting for MySQL server to start..."` and `sleep 30`: These lines print a message to the console and then pause the script for 30 seconds. This is done to give the MySQL server inside the Docker container enough time to start up.

4. `docker exec -i mysql-container mysql -uroot -pqwe123 -e "CREATE DATABASE mydatabase;"`: This command executes the `mysql` command inside the running Docker container to create a new database named `mydatabase`. The `-i` option is used to keep STDIN open even if not attached, which allows you to input the MySQL root password.

5. `docker cp /path/to/your/database.sql mysql-container:/database.sql`: This command copies the SQL file from your local machine to the Docker container. Replace `/path/to/your/database.sql` with the actual path to your SQL file.

6. `docker exec -i mysql-container mysql -uroot -pqwe123 mydatabase -e "source /database.sql"`: This command executes the `mysql` command inside the Docker container to import the SQL file into the MySQL database.

7. `echo "Done."`: This line simply prints "Done." to the console to let you know that the script has finished running.

Remember to replace `qwe123` with your desired MySQL root password, `mydatabase` with the name of your database, and `/path/to/your/database.sql` with the path to your SQL file. Also, note that the MySQL server inside the Docker container is exposed on port 3307 of your host machine.