## ChatBot Project
It's a PHP, MySQL, Jquery ChatBot  Project

### Demo <a href="http://ruetchatbot.epizy.com">RUET ChatBot</a>

This project is a chatbot system built using PHP, MySQL, and jQuery for RUET. Below are the steps to set up the project using Docker.

---
### 🚀 Step 1: Clone the Repository
```
git clone https://github.com/anayetullahefty/Docker-Project.git
cd RUET-ChatBot-master
```
### 🐳 Step 2: Create/Edit a Dockerfile in your Project Directory
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
### 🌐 Step 3:  Create a docker Network
```
#create a network named chatbot
docker network create chatbot

#Check available Docker networks
docker network ls

#Inspect network details  
docker network inspect chatbot 
```
### 🏗️ Step 4:  Build and Run the WebApp Docker image
```
#Build the Image
docker build -t chatbot-image . #Build a Docker image named "chatbot-image" using the Dockerfile in the current directory.

#Check built images 
docker images

#Run the container  
docker run -d -p 5400:80 --name chatbotapp --network chatbot chatbot-image
# Runs "chatbotapp" from "chatbot-image", mapping port 5400 on the host to port 80 inside the container  

```
### 🏗️ Step 5:  Build and Run Mysql Container
```
#Pull MySQL image  
docker pull mysql:latest

#Run MySQL container on port 3306 with defined network, password & database
docker run -d -p 3306:3306 --name db --network chatbot -e MYSQL_ROOT_PASSWORD=1test2 -e MYSQL_DATABASE=chat mysql

#Check running containers 
docker ps
```
### 🛠️ Step 6:  Access MySQL & Import Database
```
#Access the database container shell
docker exec -it db bash

#Login to MySQL as root user
mysql -u root -p

#After logging in to MySQL:
#Manually import the data using the chat.sql file located in the Database folder
#Execute the SQL Queries

```

### 🌍 Step 7: Access the WebApp
```
🔗 http://localhost:5400/ (If running locally)
🔗 http://your-server-ip:5400/ (If running on a remote server)
```
## 🎉 Your chatbot should now be live! 🚀


#### Deploy in Kubernetes
Watch this Video: https://www.youtube.com/watch?v=aG3Hq4KrvUI

