const mongoose = require('mongoose');

const logger = require('../config/logger');

async function connectDb(){
    try{
        await mongoose.connect('mongodb://localhost/movioo', {useNewUrlParser: true, useFindAndModify: false,  useUnifiedTopology: true});
        logger.info('Connected to MongoDB...');
     }catch(ex){
        logger.warn('Trying to connect to mongoDB...');
        connectDb();
    }
};


module.exports = connectDb;