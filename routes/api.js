// Here is the api which require auth
const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');

// get cart
router.get('/cart', cart.getCart);

// add to cart
router.post('/cart', cart.addToCart);

module.exports = router;
