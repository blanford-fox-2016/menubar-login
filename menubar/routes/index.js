var express = require('express');
var router = express.Router();
var models = require('../models')
var user = models.User
// var cookieParser = require('cookie-parser')
// var app = express()
// app.use(cookieParser())
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/reg', function(req, res, next) {
  if (req.body.username && req.body.email && req.body.password && req.body.role) {
    user.findAll({
      where:{email:req.body.email}
    }).then(function(log){
      if (log.length != 0) {
        res.send('email sudah terpakai')// TODO:
      }else{
        user.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        }).then(function(user){
          res.redirect('/')
        })
      }
    })
  } else {
    res.send('Harus diisi semua')// TODO:
    // kasih peringatan harus diisi
  }
})

router.get('/login', function(req, res, next) {
  res.render('login')
})

router.post('/login', function(req, res, next) {
  if (req.body.username && req.body.password) {
    user.findOne({
      where:{username: req.body.username}
    }).then(function(user) {
      if (user != null) {
        if (user.password == req.body.password) {
          // res.send(`Welcome ${user.username}`)
          res.render('user', {user})
        } else {
          res.render('login', {wrong: 'Wrong username or password!'})
        }
      } else {
        res.render('login', {wrong: 'Username not registered yet, please sign up!'})
      }
    })
  } else {
    res.send('email field must be filled')// TODO:
  }
})
module.exports = router;
