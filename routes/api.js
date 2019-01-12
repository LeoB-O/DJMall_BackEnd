// Here is the api which require auth
const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');

router.get('/user', user.getUser);

// get cart
router.get('/cart', cart.getCart);

// add to cart
router.put('/cart', cart.addToCart);

// update cart
router.post('/cart', cart.updateCart);

module.exports = router;
