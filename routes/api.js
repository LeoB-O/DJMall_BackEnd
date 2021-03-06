// Here is the api which require auth
const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const user = require('../controllers/user');
const chat = require('../controllers/chat');
const good = require('../controllers/good');
const store = require('../controllers/store');
const personalinfo = require('../controllers/personalinfo');
const login = require('../controllers/login');
const category = require('../controllers/category');

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

// add address
router.post('/addaddress',personalinfo.addAddress)

// getChat
router.get('/chat', chat.getChat);

router.get('/chatm',chat.getChatM);

// send message from user
router.post('/chat', chat.sendMessage);

//send message from merchant
router.post('/chatm',chat.sendMessageM);

// add good
router.put('/good', good.addGood);

// delete good
router.delete('/good', good.deleteGoodById);

// update good
router.post('/good', good.modifyGood);

// edit store
router.post('/store', store.editStore);

// delete user
router.delete('/user',user.deleteUser);

// get all user
router.get('/getuser',user.getUsers);

// get chat history by merchant
router.get('/chatbymerchant',chat.getChatByMerchant)

// set unread message
router.post('/changeunread',chat.changeunread)

//delete cart
router.delete('/cart', cart.deleteFromCart);

// add store
router.put('/store', store.addStore);

// delete store
router.delete('/store', store.deleteStore);

// logout
router.get('/logout', login.logout);

// add order
router.post('/order', personalinfo.addorder);

module.exports = router;
