FROM node:14
WORKDIR /app
COPY app.js .
COPY package.json .
RUN npm install
ENTRYPOINT npm run start
