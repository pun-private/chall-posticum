FROM node:20-alpine

RUN apk add procps sysstat
COPY src/app /app

WORKDIR /app

USER node

CMD [ "node", "app.js" ]
