FROM node:12-alpine
WORKDIR /app

RUN apk add --no-cache tini bash

COPY package*.json ./
COPY build/ /app/

EXPOSE 3000

ENV AUTHORIZATION_KEYS="correct-key" \
  NODE_ENV=local

RUN npm install

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
