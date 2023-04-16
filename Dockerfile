FROM node:12-alpine
WORKDIR app
COPY package*.json ./
RUN npm install
COPY * ./
RUN npm run build
EXPOSE 4000
ENTRYPOINT [ "node", "dist/main.js" ]