FROM node:14-alpine as node
# ENV HTTP_PROXY="192.168.5.8:3128"
# ENV HTTPS_PROXY="192.168.5.8:3128"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod