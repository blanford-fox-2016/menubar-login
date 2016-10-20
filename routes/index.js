var express = require('express');
var router = express.Router();
var model = require('../models')
var menu = model.Menu

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', err: "" });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register Page' });
});

router.post('/login', function(req, res, next) {
  var remme = req.body.remme;
  var user = req.body.username;
  var password = req.body.password;
  menu.findOne({
    where: {
      username : user,
      password : password
    }
  }).then((data, err) =>{
    if (data !== null){
      res.render('login', { title: 'Smile Factory', user });
    } else {
      res.render('index', { title: 'Express', err: "Password/username salah" });
    }
  })
});

router.post('/reg', function(req, res, next){
  var data = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    role : "normal"
  }
  menu.create(data)
  res.render('index', { title: 'Express', err: "Selamat Anda Telah Terdaftar, Silahkan cek email anda atau kembali ke halaman login" });
})

module.exports = router;
