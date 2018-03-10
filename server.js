const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'mongo'}:${process.env.MONGO_PORT || '27017'}/${process.env.RDCPT_DB || 'roadcaptain'}`);

const app = express();

app.use(bodyParser());

app.use(routes);

app.listen(process.env.LISTEN_PORT || '3000', () => {
   console.log(`ROAD CAPTAIN SERVER: LISTENING ON PORT ${process.env.LISTEN_PORT || '3000'}`);
});
