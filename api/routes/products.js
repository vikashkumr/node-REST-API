const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'handling GET request to setup /product'
    }); 
});

router.post('/',(req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(200).json({
        message: 'handling POST request to setup /product',
        product: product
    }); 
});

router.get('/:productId',(req,res,next) => {
    if(req.params.productId === "sample"){
        res.status(200).json({
            message: 'your guess is right'
        })
    }
    else {
        res.status(202).json({
            message: 'try again'
        })
    }
})

module.exports = router;