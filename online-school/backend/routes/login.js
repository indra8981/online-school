const router = require('express').Router();
let User = require('../models/user.model');

router.route('/loginbyemail').get((req, res) => {
  User.findOne({"email" : req.body.email}).then(user => {
    if(user == null)
    throw "Not Found";
    console.log(user)
    const userStatus = { 
      user : user,
      passwordMatch : (req.body.password == user.password)
    }; 
    res.json(JSON.stringify(userStatus))})
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
