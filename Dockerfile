FROM mhart/alpine-node:11 AS builder
WORKDIR /usr/src/app/client
RUN npm install -g serve
COPY . /usr/src/app/client
EXPOSE 5000
CMD ["serve", "-s", "build"]
