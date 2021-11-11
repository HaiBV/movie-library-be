# Dockerfile for React client

# Build react client
FROM node:14.18.1-alpine

# Working directory be app
WORKDIR /usr/src/app

COPY package*.json ./

###  Installing dependencies

RUN yarn install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
