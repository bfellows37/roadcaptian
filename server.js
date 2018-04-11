require('./src/validateEnvVars')();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const apiRoutes = require('./src/api/routes');
const defaultErrorHandler = require('./src/defaultErrorHandler');

mongoose.Promise = Promise;
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'mongo'}:${process.env.MONGO_PORT || '27017'}/${process.env.RDCPT_DB || 'roadcaptain'}`);

const app = express();
const router = express.Router();

app.use(bodyParser());
app.use(apiRoutes);
app.use(defaultErrorHandler);

app.listen(process.env.LISTEN_PORT || '3000', () => {
  console.log(`ROAD CAPTAIN SERVER: LISTENING ON PORT ${process.env.LISTEN_PORT || '3000'}`);
});
