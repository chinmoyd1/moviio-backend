const morgan = require('morgan');
const logger = require('../config/logger');

module.exports = function (app) {
    process.on('uncaughtException', (ex) => {
        logger.error("FATAL ERROR: UNCAUGHT EXCEPTION", ex);
    });
    
    process.on('unhandledRejection', (ex) => {
        logger.error('FATAL ERROR: UNHANDLED REJECTION', ex);
    });

    app.use(morgan("dev", { "stream": logger.stream }));
};