FROM node

WORKDIR /home/front/app

RUN mkdir src public build

COPY package*.json ./

RUN chown root:root ./ && npm i

CMD ["npm", "run", "start"]
