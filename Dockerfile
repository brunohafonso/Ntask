FROM node:slim

COPY . .

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

RUN npm install --production

CMD npm start