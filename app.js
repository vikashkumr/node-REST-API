const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const productsRoute = require('./api/routes/products');
const ordersRoute = require('./api/routes/orders');

 mongoose.connect('mongodb://localhost:27017/testNodeApi',{useNewUrlParser: true});
 const db = mongoose.connection;

 db.on('error', console.error.bind(console, 'connection error:'));
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})
app.use('/products',productsRoute);
app.use('/orders',ordersRoute);

module.exports = app;