# Stage 1: Build the Angular application
FROM node:latest as node
WORKDIR /app
COPY package.json package-lock.json 
RUN npm install -g @angular/cli
COPY . .
RUN ng build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/client-app /usr/share/nginx/html
