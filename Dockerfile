FROM node:lts

EXPOSE 7010

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev