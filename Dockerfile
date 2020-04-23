FROM node:13-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN apk add --no-cache bash
COPY . .
ENV PORT=3001
EXPOSE $PORT
CMD ["node", "index.js"]
