const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const userType = req.body.userType;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const school = req.body.school;
  const roll = req.body.roll;

  const newUser = new User({
    username,
    userType,
    name,
    email,
    phone,
    school,
    roll,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
