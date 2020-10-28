FROM node:latest

WORKDIR /usr/src/app

COPY . /usr/src/app

# Remove old node_modules & package-lock.json
RUN rm -r node_modules || true
RUN rm package-lock.json || true

# install dependencies
RUN npm ci

# fix node_sass/vendor
RUN npm rebuild node-sass

EXPOSE 3000

RUN npm run build

CMD [ "npm", "start:production" ]
