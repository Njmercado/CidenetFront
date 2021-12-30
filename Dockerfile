FROM node:15-alpine

RUN mkdir -p /src
WORKDIR /src

COPY . .
RUN npm install
RUN npm run build

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD ["npm", "run", "start"]
