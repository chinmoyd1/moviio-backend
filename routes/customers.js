const {Customer, validate} = require('../models/customer');
const validateId = require('../utils/customValidations');
const express = require('express');
const router = express.Router();

router
    .get('/', async(req, res) => {
        const customer = await Customer.find().sort('name');
        res.send(customer);
    })
    .post('/', async(req, res) => {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        });
        customer = await customer.save();

        res.send(customer);
    })
    .put('/:id', async (req, res) => {
        const { error } = validate(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        if(!validateId(req.params.id)) return res.status(400).send('Invalid customer ID.');

        const customer = await Customer.findByIdAndUpdate(req.params.id,
          { 
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
          }, { new: true });
      
        if (!customer) return res.status(404).send('The customer with the given ID was not found.');
        
        res.send(customer);
      })
      .delete('/:id', async (req, res) => {
        const customer = await Customer.findByIdAndRemove(req.params.id);
        
        if(!validateId(req.params.id)) return res.status(400).send('Invalid customer ID.');

        if (!customer) return res.status(404).send('The customer with the given ID was not found.');
      
        res.send(customer);
      })
      .get('/:id', async (req, res) => {
        const customer = await Customer.findById(req.params.id);
        
        if(!validateId(req.params.id)) return res.status(400).send('Invalid customer ID.');

        if (!customer) return res.status(404).send('The customer with the given ID was not found.');
      
        res.send(customer);
      });
      
module.exports = router;