const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup =require('../controllers/signup');
const personalinfo =require('../controllers/personalinfo');
const good = require('../controllers/good');
const store = require('../controllers/store');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

router.post('/signup',signup.signup);

router.get('/personalinfo',personalinfo.getinfo);

router.get('/order',personalinfo.getorder);

router.get('/getaddress',personalinfo.getaddress);

router.post('/editinfo',personalinfo.editinfo);

router.get('/goods', good.getGoods);

router.get('/goods/category', good.getGoodsByCate);

router.get('/goods/store', good.getGoodsByStoreAndCate);

router.get('/good', good.getGoodById);

router.get('/store', store.getById);

router.get('/stores', store.getAll);

module.exports = router;
