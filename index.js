const express = require('express');

const logger = require('./config/logger');

const app = express();

require('./startup/logging')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const PORT = process.env.PORT || 3000;
app.listen(3000, () => logger.info(`Listening on ${PORT}...`));