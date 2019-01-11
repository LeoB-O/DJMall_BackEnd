// Here is the api which require auth
const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');

router.get('/cart', cart.getCart);
router.post('/cart', cart.addToCart);

module.exports = router;
