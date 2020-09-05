const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getbyemail').get((req, res) => {
  User.findOne({"email" : req.body.email}).then(user => {
    if(user == null)
    throw "Not Found";
    res.json(user)})
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/loginbyemail').post((req, res) => {
  console.log(req.body);
  User.findOne({"email" : req.body.email}).then(user => {
    if(user == null)
    throw "Not Found";
    console.log(user)
    const userStatus = { 
      passwordMatch : (req.body.password == user.password)
    }; 
    res.json(userStatus)})
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/').patch(async (req, res) => {
  const filter = { email : req.body.email };
  const update = req.body;
  let doc = await User.findOneAndUpdate(filter, update, {
  new: true,
  });
  if(doc==null)
    res.status(400).json('Error');
  else
    res.status(200).json(doc);
});


router.route('/add').post((req, res) => {
  const password = req.body.password;
  const userType = req.body.userType;
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const school = req.body.school;
  const roll = req.body.roll?req.body.roll:null;

  const newUser = new User({
    email,
    password,
    userType,
    name,
    phone,
    school,
    roll,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route(`/`)

module.exports = router;
