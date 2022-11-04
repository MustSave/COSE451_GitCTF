FROM node:16.18.0

WORKDIR /home/front/app

COPY package*.json ./

RUN npm ci

CMD ["npm", "run", "start"]