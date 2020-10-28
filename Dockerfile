FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm ci

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start:production" ]
