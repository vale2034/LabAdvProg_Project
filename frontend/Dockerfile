# Stage 1: Compile and Build angular codebase
FROM node:latest as build

WORKDIR /app
COPY ./ /app/

RUN npm install
RUN npm run build --prod

# Stage 2: Serve app with nginx server
FROM nginx:latest

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

# Copia il file di configurazione personalizzato di Nginx
COPY nginx.conf  /etc/nginx/nginx.conf

EXPOSE 80
