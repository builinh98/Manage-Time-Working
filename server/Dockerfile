FROM node:10.13-alpine
WORKDIR /app
ADD package*.json /app/
ADD . /app/
RUN npm install
EXPOSE 8080

# start command
CMD [ "npm", "start" ]