# Stage 1: Build the Angular application
FROM node:latest as node
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/client-app /usr/share/nginx/html
