const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup =require('../controllers/signup');
const personalinfo =require('../controllers/personalinfo');
const good = require('../controllers/good');
const store = require('../controllers/store');
const info = require('../controllers/information');
const search=require('../controllers/search');
const rate=require('../controllers/rate');
const category = require('../controllers/category');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 登录
router.post('/login', login.login);
// 注册
router.post('/signup',signup.signup);
// 获取所有商品
router.get('/goods', good.getGoods);
// 根据类别获取商品
router.get('/goods/category', good.getGoodsByCate);
// 根据店铺获取商品
router.get('/goods/store', good.getGoodsByStoreAndCate);
// 根据店铺和类别获取商品
router.get('/good', good.getGoodById);
// 根据店铺ID获取店铺
router.get('/store', store.getById);
// 获取所有店铺
router.get('/stores', store.getAll);
// 获取首页图片
router.get('/indexImages',info.getIndexImage);
// 获取所有分类
router.get('/categories', info.getCategories);
// 搜索
router.get('/search',search.search);
// 获取订单详情
router.get('/orderdetail',personalinfo.getorderdetail);
//获取评分
router.get('/getrate',rate.getrate);
// 提交评分
router.post('/commitrate',rate.commitrate);
// 刷新首页类别
router.get('/api/category', category.updateCategory);



router.options('*', (req, res) => {
  res.send();
});

module.exports = router;
