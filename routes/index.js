var express = require('express');
var router = express.Router();
let models = require('../models')
let Users = models.Users
let app = express()

app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let remember_me = req.body.remember_me

  Users.findOne({
    where: {
      username: username
    }
  }).then((data) => {
    console.log(data.username);
  })
  res.render('index')
})

router.get('/login', function(req, res, next) {
  res.send("a")
  // res.render('index', { title: 'Express' });
});

module.exports = router;
