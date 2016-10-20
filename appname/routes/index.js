'use strict'
var express = require('express');
var router = express.Router();
let models = require('../models');
let Hasil = models.User


// var ejs = require("ejs").compile(str)
/* GET home page. */
router.get('/', function(req, res, next) {
  let output = req.body.username
  let pass = req.body.user_password
  res.render('index', { title: output });
});

// router.post('/', function(req, res, next) {
//   let user = req.body.username
//   let pass = req.body.user_password
//   console.log(output);
//   res.render('index', { title: passwod });
// });
router.get('profile', function(req, res, next) {
  res.render('profile');
});

router.post('/', (req, res,next) => {
  let user = req.body.username
  let pass = req.body.user_password
  console.log(user);
  console.log(pass);
  Hasil.findAll({
    where: {
      email: user,
      password: pass
    }
  }).catch(function (err) {
    res.send(err.message)
  }).then((data) => {
    if (data.length>0) {
      // req.session.username = data.email
       res.render('profile',{ title: "anda salah" })
    }else{
      res.render('index', { title: "anda salah" });
    }
  })
})
module.exports = router;
