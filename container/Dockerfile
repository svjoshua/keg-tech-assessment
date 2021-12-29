FROM node:lts-alpine

WORKDIR /usr/src/app

# COPY and install first to save build time
# when package.json has not changed
COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

CMD [ "yarn", "dev" ]

EXPOSE 3000 5005
