FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app/ .

CMD ["npm", "run", "serve"]

EXPOSE 8081
