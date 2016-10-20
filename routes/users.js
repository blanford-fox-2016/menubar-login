var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send(req.session.name)
  // res.send(typeof(req.session.username));
  if(typeof(req.session.username) == "undefined") {
    res.redirect('/')
  }
  else {
    res.render('users',{session_name: req.session.username, session_role: req.session.role})
    // res.send(req.session.maxAge)
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
