FROM node:16 as build-stage

WORKDIR /build
COPY package.json ./
COPY prisma ./prisma/

RUN yarn install
ARG DB_CONNECTION
RUN npx prisma db push
RUN npx prisma generate

COPY . .

RUN yarn build:ts


FROM node:16

COPY --from=build-stage /build/node_modules ./node_modules
COPY --from=build-stage /build/package*.json ./
COPY --from=build-stage /build/dist ./dist

EXPOSE 3000
CMD [ "npm", "run", "start" ]
