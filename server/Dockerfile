FROM node

WORKDIR /home/server/app

COPY package*.json ./

RUN chown root:root ./ && npm ci

CMD ["npm", "run", "test"]
