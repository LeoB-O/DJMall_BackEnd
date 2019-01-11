const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup =require('../controllers/signup');
const personalinfo =require('../controllers/personalinfo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

router.post('/signup',signup.signup);

router.get('/personalinfo',personalinfo.getinfo)

router.get('/order',personalinfo.getorder)

router.get('/getaddress',personalinfo.getaddress)

router.post('/editinfo',personalinfo.editinfo)

router.post('/editaddress',personalinfo.editaddress)

router.post('/deleteaddress',personalinfo.deletead)

module.exports = router;
