#!/bin/bash

cd /roadcaptain
npm install
node_modules/.bin/nodemon --inspect=api:9229 server.js
