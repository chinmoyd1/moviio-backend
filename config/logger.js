const winston = require('winston');
require('winston-mongodb');


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine( winston.format.colorize(), winston.format.simple() ),
    //defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console()
    ]
});
if (process.env.NODE_ENV === 'production') {
    logger.add(new winston.transports.File({ 
        level: 'info',
        filename: 'logfile.log',
        format: winston.format.simple()
    }));
    logger.add(new winston.transports.MongoDB({
        level: 'error',
        db: 'mongodb://localhost/movioo',
        format: winston.format.json()
    }));
};

logger.stream = {
    write: function(message, encoding){
        const messaeWithoutNewLine = message.split("").slice(0, -3).join("");
        logger.info(messaeWithoutNewLine);
    }
};

module.exports = logger;
// 1. error
// 2. warn
// 3. info
// 4. verbose
// 5. debug
// 6. silly