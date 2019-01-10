const express = require('express');
const router = express.Router();
const login = require('../controllers/login');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login.login);

module.exports = router;
