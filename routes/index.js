var express = require('express');
var router = express.Router();
var model = require('../models')
var menu = model.Menu

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Page' });
});

router.post('/reg', function(req, res, next){
  var data = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    role : "normal"
  }
  menu.create(data)
})

module.exports = router;
