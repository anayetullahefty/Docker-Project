## NodeNginxStack - Full-Stack Dockerized Application

#### Overview

NodeNginxStack is a Dockerized full-stack web application that integrates a Node.js backend and a frontend (React/Vue/Angular) served via Nginx. The project utilizes multi-stage builds to optimize image size and performance.

#### Features
- **Frontend**: Built with Node.js and served via Nginx
-  **Backend**: Express.js (or any Node.js framework) running on port 5000
-   **Multi-stage Docker build**: Optimizes final image size
-     *Nginx**: Used as a reverse proxy
5. **Efficient dependency management**


#### Project Structure
```
NodeNginxStack/
├── frontend/  # Frontend source code
│   ├── package.json
│   ├── src/
│   ├── public/
│   └── ...
├── backend/   # Backend source code
│   ├── package.json
│   ├── server.js
│   ├── routes/
│   └── ...
├── nginx.conf # Nginx configuration
├── Dockerfile # Multi-stage Docker setup
└── README.md  # Project documentation
```
### Getting Started

#### Prerequisites

Ensure you have the following installed: [Docker](https://www.docker.com/)

---

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

#### Dockerfile
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



Step 1: Build the Docker Image

docker build -t nodenginxstack .

Step 2: Run the Container

docker run -p 80:80 -p 5000:5000 nodenginxstack

The frontend will be accessible on http://localhost:80

The backend API will run on http://localhost:5000

Dockerfile Explanation

This project uses a multi-stage Docker build:

Stage 1 (Build)

Uses Node.js to install dependencies and build frontend/backend.

Stage 2 (Production)

Uses Nginx to serve the frontend.

Runs the backend using Node.js.

Dockerfile

# Stage 1: Build Frontend and Backend
FROM node:23 AS build-stage
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Stage 2: Set up Nginx and Node.js Backend
FROM nginx:alpine AS production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/frontend/build /usr/share/nginx/html
COPY --from=build-stage /app/backend /app/backend
RUN apk add --no-cache nodejs npm

EXPOSE 80 5000
CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]

Customizing the Nginx Configuration

Modify nginx.conf as needed:

server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
    location /api/ {
        proxy_pass http://localhost:5000/;
    }
}

License
