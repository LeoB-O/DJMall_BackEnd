const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup =require('../controllers/signup');
const personalinfo =require('../controllers/personalinfo');
const good = require('../controllers/good');
const store = require('../controllers/store');
const info = require('../controllers/information');
const search=require('../controllers/search')
const rate=require('../controllers/rate')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

router.post('/signup',signup.signup);

router.get('/goods', good.getGoods);

router.get('/goods/category', good.getGoodsByCate);

router.get('/goods/store', good.getGoodsByStoreAndCate);

router.get('/good', good.getGoodById);

router.get('/store', store.getById);

router.get('/stores', store.getAll);

router.get('/indexImages',info.getIndexImage);

router.get('/categories', info.getCategories);

router.post('/search',search.search);

router.get('/orderdetail',personalinfo.getorderdetail);

router.get('/getrate',rate.getrate);

router.post('/commitrate',rate.commitrate)

router.options('*', (req, res) => {
  res.send();
});

module.exports = router;
