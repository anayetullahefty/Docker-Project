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
