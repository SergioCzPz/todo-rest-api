FROM node:20.18-alpine3.21 AS base

ENV DIR=/project
WORKDIR $DIR

FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package*.json $DIR

RUN npm ci

COPY tsconfig*.json $DIR
COPY src $DIR/src
COPY .swcrc $DIR
COPY .env $DIR

RUN npm run start:build && \
    npm prune --production

FROM base AS production

ENV USER=node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist
COPY --from=build $DIR/.env $DIR/.env

EXPOSE 3000
USER $USER
CMD [ "dumb-init", "node", "dist/app.js" ]