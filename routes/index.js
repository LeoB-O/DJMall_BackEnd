const express = require('express');
const router = express.Router();
const login = require('../controllers/login');
const signup =require('../controllers/signup');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

router.post('/signup',signup.signup);


module.exports = router;
