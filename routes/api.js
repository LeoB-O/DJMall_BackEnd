// Here is the api which require auth
const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');
const chat = require('../controllers/chat');
const personalinfo = require('../controllers/personalinfo');

router.get('/user', user.getUser);

// get cart
router.get('/cart', cart.getCart);

// add to cart
router.put('/cart', cart.addToCart);

// update cart
router.post('/cart', cart.updateCart);

// get personalinfo
router.get('/personalinfo', personalinfo.getinfo);

// get order
router.get('/order', personalinfo.getorder);

// get address
router.get('/getaddress', personalinfo.getaddress);

// edit info
router.post('/editinfo', personalinfo.editinfo);

// edit address
router.post('/editaddress', personalinfo.editaddress);

// deleteaddress
router.post('/deleteaddress', personalinfo.deletead);

// getChat
router.get('/chat', chat.getChat);

// send message
router.post('/chat', chat.sendMessage);


module.exports = router;
