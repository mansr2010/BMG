FROM node:latest
WORKDIR /API
COPY package.json /API/
RUN npm install
COPY . /API/
EXPOSE 5000
CMD ["npm", "run", "start"]
