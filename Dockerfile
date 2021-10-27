FROM node
COPY . /app/src
WORKDIR /app/src
RUN npm install
EXPOSE 5000
ENTRYPOINT [ "npm", "start" ]
