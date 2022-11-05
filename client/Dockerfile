FROM node

WORKDIR /home/front/app

RUN mkdir src public

COPY package*.json ./

RUN chown root:root ./ && npm i

CMD ["npm", "run", "start"]
