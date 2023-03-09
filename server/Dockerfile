FROM node

WORKDIR /home/server

RUN mkdir app

COPY package*.json ./

RUN chown root:root ./ && npm i

CMD ["npm", "run", "test"]
