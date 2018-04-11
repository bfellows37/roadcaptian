'use strict';
const express = require('express');
// const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');
const app = express();

// app.use(bodyParser());
app.use('/api', proxy('api:3000'));
app.use('/', proxy('app:3000'));

app.listen(80, () => {
  console.log('proxy listening on 80');
});
