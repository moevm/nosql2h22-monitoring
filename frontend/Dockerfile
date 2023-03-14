FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install axios

COPY . .

EXPOSE 

CMD [ "npm", "run", "start" ]