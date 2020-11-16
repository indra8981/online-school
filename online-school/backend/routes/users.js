const router = require("express").Router();
const withAuth = require("../middleware");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/getbyemail").get(withAuth, async (req, res) => {
  console.log(res.email);
  User.findOne({ email: res.email })
    .then((user) => {
      if (user == null) throw "Not Found";

      res.json(user);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").patch(async (req, res) => {
  const filter = { email: req.body.email };
  const update = req.body;
  let doc = await User.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (doc == null) res.status(400).json("Error");
  else res.status(200).json(doc);
});

router.route("/add").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userType = req.body.userType;
  const name = req.body.name;
  const phone = req.body.phone;
  const school = req.body.school;
  const roll = req.body.roll ? req.body.roll : null;

  const newUser = new User({
    email,
    password,
    userType,
    name,
    phone,
    school,
    roll,
  });

  console.log(newUser);
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route(`/`);

module.exports = router;
