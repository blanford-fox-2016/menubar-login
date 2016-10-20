var express = require('express');
var router = express.Router();
var session = require('express-session')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  if(typeof (req.session.user_id) === "undefined"){
    res.redirect('/')
  }else{
    res.render('users', {session_user_id: req.session.user_id, session_user_role: req.session.role})
  }
});

router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/')
});

module.exports = router;
