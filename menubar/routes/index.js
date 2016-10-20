var express = require('express');
var router = express.Router();
var models = require('../models')
var user = models.User

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('user')
  } else {
    res.render('index');
  }
});

router.post('/reg', function(req, res, next) {

  if (req.body.username && req.body.email && req.body.password && req.body.role) {
    user.findAll({
      where:{email:req.body.email}
    }).then(function(log){
      if (log.length != 0) {
        res.render('index', { err: 'Email already taken!'});
      }else{
        user.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role
        }).then(function(user){
          // res.redirect('/')
          res.render('login', {success: 'Your registration was success! You can login now'})
        })
      }
    })
  } else {
    res.render('index', { err: 'All fields required!'});
    // kasih peringatan harus diisi
  }
})

router.get('/login', function(req, res, next) {
  if (req.session.user_id) {
    res.redirect('/user')
  } else {
    res.render('login')
  }
})

router.post('/login', function(req, res, next) {
  if (req.session.user_id) {
    res.render('user', {user: req.session.user_name})
  } else {
    if (req.body.username && req.body.password) {
      user.findOne({
        where:{username: req.body.username}
      }).then(function(user) {
        if (user != null) {
          if (user.password == req.body.password) {
            req.session.user_id = user.id
            req.session.user_name = user.username
            req.session.role = user.role
            res.redirect('user')
          } else {
            res.render('login', {wrong: 'Wrong username or password!'})
          }
        } else {
          res.render('login', {wrong: 'Username not registered yet, please sign up!'})
        }
      })
    } else {
      res.send('email field must be filled')
    }
  }
})

router.get('/user', function(req, res, next) {
  if (req.session.user_id) {
    res.render('user', {user: req.session.user_name, users: req.session})
  } else {
    res.redirect('/login')
  }
})

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
})
module.exports = router;
