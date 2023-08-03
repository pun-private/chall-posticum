FROM node:20-alpine

RUN apk add procps sysstat
COPY src/app /app

WORKDIR /app

USER node

HEALTHCHECK --interval=30s --timeout=3s CMD wget -O- http://localhost:3000

CMD [ "node", "app.js" ]
