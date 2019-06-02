const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/',(req, res, next) => {
   Product.find()
   .select("name price _id")
   .exec()
   .then(docs => {
       const responce = {
           count: docs.length,
           products: docs.map(doc => {
               return {
                    name: doc.name,
                    price: doc.price,
                    id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:4000/products/' + doc._id
                    }
               }
           })
       }
        res.status(200).json(responce);
   }).catch(err => {
       console.log({error: err})
   }) 
});

router.post('/',(req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "created product successfully",
            createdProduct: {
                name: result.name,
                price: result.price,
                id: result._id,
                request: {
                    type: 'GET',
                    url: 'https://localhost:4000/products/' + result._id
                }
            }
        })
    }).catch(err => console.log(err));
    res.status(200).json({
        message: 'handling POST request to setup /product',
        product: product
    }); 
});

router.get('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From Database", doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

router.delete('/:productId',(req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.json(500).json({error: err});
    });
})


router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console,log(err);
        res.status(500).json({
            error: err
        })
    });
})
module.exports = router;
