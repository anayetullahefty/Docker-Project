## 🚀 NodeNginxStack - Full-Stack Dockerized Application

#### 🌟 Overview

NodeNginxStack is a Dockerized full-stack web application that integrates a Node.js backend and a frontend (React/Vue/Angular) served via Nginx. The project utilizes **multi-stage** builds to optimize image size and performance.

#### ✨ Features
- **Frontend**: Built with Node.js and served via Nginx
- **Backend**: Express.js (or any Node.js framework) running on port 5000
- **Multi-stage Docker build**: Optimizes final image size
- **Nginx**: Used as a reverse proxy
- **Efficient dependency management**


#### 📂 Project Structure
```
NodeNginxStackAPP/  
├── frontend/               <!-- Frontend source code -->
│   ├── package.json        <!-- Frontend dependencies -->
│   ├── package-lock.json   <!-- Ensures consistent installs -->
│   ├── src/                <!-- Frontend source code (components, logic) -->
│   ├── public/             <!-- Static files (images, icons, etc.) -->
│   └── ...                 <!-- Other frontend files -->
├── backend/                <!-- Backend source code -->
│   ├── package.json        <!-- Backend dependencies -->
│   ├── package-lock.json   <!-- Ensures consistent installs -->
│   ├── server.js           <!-- Main backend file (Express server) -->
│   ├── user_list.txt       <!-- Sample data for testing -->
│   └── ...                 <!-- Other backend files (routes, models, etc.) -->
├── nginx.conf              <!-- Nginx configuration (reverse proxy) -->
├── Dockerfile              <!-- Multi-stage Docker build setup -->
└── README.md               <!-- Project documentation (info, setup, usage) -->
```
---
### 🚀 Getting Started

#### ✅ Prerequisites

Ensure you have the following installed: [🐳 Docker](https://www.docker.com/)

### Build and Run the Project

#### 🚀 Step 1: Clone the Repository
```
git clone https://github.com/anayetullahefty/Docker-Project.git
cd 4. NodeNginxStackApp
```
#### 🐳 Step 2: Create/Edit a Dockerfile in your Project Directory
If you already have a Dockerfile, ensure it contains the following setup:

This project uses a **multi-stage Docker build** to optimize the final image and improve build efficiency.

##### Stage 1: Build

- Uses **Node.js** to install dependencies.
- Builds both the **frontend** and **backend**.

##### Stage 2: Production

- **Nginx** is used to serve the **frontend**.
- Runs the **backend** using **Node.js**.

#### 📜 Dockerfile
```
# Use a Node.js base image for building the frontend and backend
FROM node:23 AS build-stage

# Set the working directory for the frontend build
WORKDIR /app/frontend

# Copy frontend dependencies and install them
COPY frontend/package*.json ./
RUN npm install

# Copy the frontend source files and build
COPY frontend/ .
RUN npm run build

# Set the working directory for the backend
WORKDIR /app/backend

# Copy backend dependencies and install them
COPY backend/package*.json ./
RUN npm install

# Copy the backend source files
COPY backend/ .

# Stage 2: Set up the Nginx server for the frontend and Node server for backend
FROM nginx:alpine AS production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files to Nginx's html directory
COPY --from=build-stage /app/frontend/build /usr/share/nginx/html

# Copy backend to the final image and install Node.js
COPY --from=build-stage /app/backend /app/backend
RUN apk add --no-cache nodejs npm

# Expose necessary ports
EXPOSE 80 5000

# Start both backend and Nginx
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]
```

#### 🌐 Step 3: Create a docker Network
```
#create a network named nodenginxstack-net
docker network create nodenginxstack-net

#Check available Docker networks
docker network ls

#Inspect network details  
docker network inspect nodenginxstack-net 
```
#### 📦 Step 4: Create a Volume
```
#create a Volume named nodenginxstack-Vol
docker volume create nodenginxstack-Vol

#Check available Docker networks
docker volume ls

#Inspect Volume details  
docker network inspect nodenginxstack-Vol
```
Mounting the Volume:
- The -v nodenginxstack-Vol:/app/backend option ensures that the backend's data is stored persistently.
- This means any changes inside /app/backend in the container will persist in the volume even if the container is removed
#### 🏗️ Step 5:  Build and Run the WebApp nodenginxstack apps image

```
#Build the Image
docker build -t nodenginxstack-app . 

#Check built images 
docker images

#Run the Container
docker run --network nodenginxstack-net -v nodenginxstack-Vol/app/backend -p 80:80 -p 5000:5000 -p 80:80 nodenginxstack-app
```
#### 🎯 Step 6:
1. Check Running Containers:
``` docker ps ```
2. Access Logs:
``` docker logs nodenginxstack-container ```
3. Connect to Container:
``` docker exec -it nodenginxstack-container sh ```

### 🌍 Step 7: Access the WebApp
```
🔗 The frontend will be accessible on http://localhost:80
🔗 The backend API will run on http://localhost:5000
```
---
🚀 Happy Coding and Enjoy Your Dockerized Full-Stack Application! 🎉
---
