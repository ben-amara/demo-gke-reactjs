# Stage 0 - Build frontend Assets
FROM node:16 as builder

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . .

RUN npm run build

# Stgae 1 - Serve Frontend Assets

FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx

ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]

