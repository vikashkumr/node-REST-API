const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');   

router.get('/',(req, res, next) => {
    Order.find()
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
})
router.post('/',(req,res,next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
    .then(result => {
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
    res.status(200).json({
        message: 'handling POST request for orders',
        order: order
    })
})

module.exports = router;