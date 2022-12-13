FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "yarn.lock"]

RUN yarn install

COPY . ./

EXPOSE 3000

EXPOSE 5005

CMD ["yarn", "start"]