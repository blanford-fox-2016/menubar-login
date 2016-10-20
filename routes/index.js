var express = require('express');
var router = express.Router();
var model = require('../models')
var pendatang = model.pendatang

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {username: "", password: ""});
});

router.post('/', function(req, res){
  console.log(req.body.username);
  var input_username = req.body.username;
  var input_password = req.body.password;

  pendatang.findOne({
    where:{
      username : input_username,
      password : input_password
    }
  }).catch(function(err){
    console.log(err.massage);
  }).then(function(data){
    console.log(data);
    if (data != null) {
      req.session.username = data.username
      res.render('./user', { username: data.username, password: data.password });
    }else{
      res.send("lol")
    }
  })


})

module.exports = router;
