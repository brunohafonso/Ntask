FROM node:slim

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN apt-get update

RUN apt-get install -y build-essential

RUN apt-get install -y python

RUN npm install --production

CMD ["npm", "start"]