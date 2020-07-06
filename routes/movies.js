const express = require('express');
const router = express.Router();

const validateId = require('../utils/customValidations');
const {Genre} = require('../models/genre');
const {Movie, validate} = require('../models/movie');


router
    .get('/', async(req, res) => {
        const movies = await Movie.find().sort('name');
        return res.send(movies);
    })
    .post('/', async(req, res) => {
        const {error} = validate(req.body);
        if(error) return res.status(400).send(eroor.details[0].message);

        if(!validateId(req.body.genreId)) return res.status(400).send('Invalid genre ID.');

        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid genre.');

        let movie = new Movie({
            title: req.body.title,
            genre: {
                _id: req.body.genreId,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });

        movie = await movie.save();
        res.send(movie);
    })
    .put('/:id', async(req, res) => {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        
        if(!validateId(req.body.genreId)) return res.status(400).send('Invalid genre ID.');

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send('Invalid genre.');

        const movie = await Movie.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, { new: true });

        if(!movie) return res.status(404).send('The movie with the given ID was not found.');

        res.send(movie);
    })
    .delete('/:id', async(req, res) => {
        if(!validateId(req.body.genreId)) return res.status(400).send('Invalid movie ID.');

        const movie = await Movie.findByIdAndRemove(req.params.id);

        if(!movie) return res.status(404).send('The movie with the given ID not found.');
        res.send(movie);
    })
    .get('/:id', async(req, res) => {
        if(!validateId(req.params.id)) return res.status(400).send('Invalid movie ID.');
        const movie = await Movie.findById(req.params.id);

        if (!movie) return res.status(404).send('The movie with the given ID not found.');
        res.send(movie);
    });

module.exports = router;