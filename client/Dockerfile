FROM node:10.13-alpine
WORKDIR /app
ADD package*.json /app/
ADD . /app/
RUN npm install
RUN npm run build
EXPOSE 3000

# start command
CMD [ "npm", "start" ]