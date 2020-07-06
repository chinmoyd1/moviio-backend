const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const schema = Joi.object().keys({
        id: Joi.objectId(),
        name: Joi.string().alphanum().min(3).max(30).required()
    });

    return Joi.validate(genre, schema);
};

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;