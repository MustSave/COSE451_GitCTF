FROM node

WORKDIR /home/front/app

COPY package*.json ./

RUN chown root:root ./ && npm i

CMD ["npm", "run", "start"]
