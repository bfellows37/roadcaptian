const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/roadtrip');

const app = express();

app.use(bodyParser());

app.use(routes);

app.listen('3000', () => {
   console.log('3000');
});
