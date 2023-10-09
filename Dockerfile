#stage 1
FROM node:latest as node
WORKDIR /app

RUN npm install -g @angular/cli@15

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/client-app /usr/share/nginx/html