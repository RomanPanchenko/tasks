FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

RUN mkdir ./tmp && chown node:node ./tmp
COPY --chown=node:node config ./config
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig.json ./
COPY --chown=node:node tsconfig.build.json ./
RUN npm run build

RUN rm -f package*.json


FROM build as release
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app /usr/src/app

EXPOSE 3000
CMD [ "su", "node", "-c", "node dist/main" ]
