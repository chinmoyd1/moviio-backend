const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        uniquie: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {    
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
};

exports.User = User; 
exports.validate = validateUser;