var express = require('express');
var router = express.Router();
var model = require('../models')
var menu = model.Menu

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Session', err: "" });
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
  }).then((data) =>{
    if (data !== null){
      req.session.name = data.username;
      req.session.role = data.role;
      res.render('login', { title: 'Smile Factory', user });
    } else {
      res.render('index', { title: 'Express', err: "Password/username salah" });
    }
  })
});

router.get('/user', function(req, res, next) {
  // res.send('respond with a resource');
  if(typeof (req.session.name) === "undefined"){
    res.redirect('/')
  }else{
    res.render('user', {session_nama: req.session.nama, session_role: req.session.role, title: "Main Page"})
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
});

router.post('/reg', function(req, res, next){
  var data = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    role : req.body.role || "normal"
  }
  menu.create(data)
  res.render('index', { title: 'Express', err: "Selamat Anda Telah Terdaftar, Silahkan cek email anda dan melakukan login" });
})

module.exports = router;
