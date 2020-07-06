
const express = require('express');
const {Genre, validate} = require('../models/genre');
const router = express.Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

router
    .get('/', asyncMiddleware(async (req, res) => {
            const genres = await Genre.find().sort('name');
            res.send(genres);
    }))
    .post('/', asyncMiddleware(async (req, res) => {
        const {err} = validate(req.body);
        if (err) return res.status(400).send(err.details[0].message);

        let genre = new Genre({ name: req.body.name });
        genre = await genre.save();    
        
        res.send(genre);
    }))
    .put('/:id', asyncMiddleware(async (req, res) => {
        const {err} = validate(req.body);
        if (err) return res.status(400).send(err.details[0].message);

        if(!validateId(req.params.id)) return res.status(400).send('Invalid genre ID.');

        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
        });
        if (!genre) return res.status(404).send(`The genmre with ID of '${req.params.id}' was not found`);
          
        res.send(genre);
    }))
    .delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send(`The genmre with ID of '${req.params.id}' was not found`);

        if(!validateId(req.params.id)) return res.status(400).send('Invalid genre ID.');

        res.send(genre);
    }))
    .get('/:id', asyncMiddleware(async (req, res) => {
        const genre = await Genre.findById(req.parrams.id);
        if (!genre) return res.status(404).send(`The genmre with ID of '${req.params.id}' was not found`);

        if(!validateId(req.params.id)) return res.status(400).send('Invalid genre ID.');

        res.send(genre);
    }));

module.exports = router; 