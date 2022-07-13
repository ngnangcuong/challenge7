FROM node:14-alpine as node
# ENV HTTP_PROXY="192.168.5.8:3128"
# ENV HTTPS_PROXY="192.168.5.8:3128"
WORKDIR /app
RUN npm install -g @angular/cli
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN ng build --prod --optimization=false
CMD ["ng", "serve"]
