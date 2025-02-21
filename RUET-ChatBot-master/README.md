# RUET-ChatBot
It's a PHP, MySQL, Jquery ChatBot For My University RUET

# Demo

<a href="http://ruetchatbot.epizy.com">RUET ChatBot</a>

This project is a chatbot system built using PHP, MySQL, and jQuery for RUET. Below are the steps to set up the project using Docker.

---
### 🚀 Step 1: Clone the Repository
```
git clone https://github.com/your-username/your-repo-name.git
cd RUET-ChatBot-master
```
### Step 2: Create/Edit a Dockerfile in your Project Directory
If you already have a Dockerfile, ensure it contains the following setup:
```
# Use the official PHP 7.4 image with Apache pre-installed
FROM php:7.4-apache

# Install necessary PHP extensions for MySQL support
RUN docker-php-ext-install pdo pdo_mysql mysqli

# Start the Apache web server in the foreground (keeps the container running)
CMD /usr/sbin/apache2ctl -D FOREGROUND

# Copy all project files from the local machine to the Apache web directory inside the container
COPY . /var/www/html/

# Expose port 80 to allow external access to the web server
EXPOSE 80
```

### Step 3:  Build the Docker Image
`docker build -t chatbot-image . # Build a Docker image named "chatbot-image" using the Dockerfile in the current directory (.)`
### Step :
### Step :
### Step :
### Step :





# Install
```
From Database Folder Import chat.sql into your database
Run Your Server
Type localhost/chatbot/chatbot.php on your Browser
```

# DevOps
## Deploy in Kubernetes
Watch this Video: https://www.youtube.com/watch?v=aG3Hq4KrvUI





