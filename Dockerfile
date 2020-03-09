FROM node:12.14.1-alpine
WORKDIR /app
COPY package*.json ./
COPY build/ /app/

# This should be done to avoid any platform dependent packages
RUN yarn install

EXPOSE 3000
RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "server.js"]
