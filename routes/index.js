var express = require('express');
var router = express.Router();
const models = require('../models');
const user = models.User
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  res.render('index')
})

router.post('/', function (req, res, next) {
  var username_input = req.body.username
  var password_input = req.body.password

  user.findOne({
    where: {
      username: username_input,
      password: password_input
    }
  }).catch(function (err) {
    res.send(err.message)
  }).then(function (data) {
    if(data) {
      req.session.username = data.username
      req.session.role = data.role
      res.redirect('/users')
    }
    else {
      res.redirect('/')
    }
  })
})

module.exports = router;
