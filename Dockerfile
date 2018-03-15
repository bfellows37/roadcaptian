FROM node:carbon

COPY . /roadcaptain

WORKDIR /roadcaptain

RUN npm install

EXPOSE 3000
