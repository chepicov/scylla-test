FROM node:lts-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

RUN npm run build --prod

CMD ["npm", "run", "start:prod"]

