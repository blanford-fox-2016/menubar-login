var express = require('express');
var router = express.Router();
let models = require('../models')
let Users = models.Users

// app.use(express.session({secret: '1234567890QWERTY'}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , session_user_id: req.session.user_id, session_user_name: req.session.user_name});
});

router.post('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let remember_me = req.body.remember_me

  Users.findOne({
    where: {
      username: username,
      password: password
    }
  }).then((data) => {
    console.log(req.session);
    console.log(data.role);
    req.session.user_id = data.id
    req.session.user_name = data.username
    req.session.role = data.role
    res.redirect('/users')

  }).catch((err) => {
    if(err) console.log(err);
    res.render('index', {
      title: 'Express',
      err: 'Input wrong'})
  })

})



module.exports = router;
