# Normal Node version may include git or other bunch of packages
# `node:alpine` -> It only contains most stripped down version of node
FROM node:20-alpine

WORKDIR /usr/app

# by doing this, docker cached the package.json and will run `npm install` until any changes in `package.json` file
COPY ./package.json ./
RUN npm install

COPY ./ ./


CMD [ "npm", "start"]

# get this command to get it installed -> docker build -t rkteche/post-service .
# docker run rkteche/post-service -> Sever starts @4000 but It can't be accessed from local machine -> cause it's running inside container
# to make it work, we have to forward localhost:4000 request to container localhost@4000
# use `docker run -p <PORT_NUMBER>:<PORT_NUMBER> <IMAGE_NAME | IMAGE_ID>`

# docker run -p 4000:4000 rkteche/postservice
