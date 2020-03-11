FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
COPY build/ /app/

EXPOSE 3000
RUN apk add --no-cache tini bash

ENV AUTHORIZATION_KEYS="correct-key,other-key" \
  NODE_ENV=local

RUN npm install

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
