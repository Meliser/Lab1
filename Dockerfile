# build environment
FROM node:lts-alpine
RUN npm install -g http-server
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
COPY . /app
RUN npm run build
EXPOSE 8080
CMD [ "http-server", "dist" ]
