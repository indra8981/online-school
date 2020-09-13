const router = require('express').Router();
const withAuth = require('../middleware');
let ClassRoom = require('../models/classroom.model');

router.route('/').get(withAuth, (req, res) => {
  const creatorEmail = res.email;
  console.log(creatorEmail);
  ClassRoom.find({"creatorEmail" : creatorEmail})
    .then(classrooms => {
      res.json(classrooms)
      console.log(classrooms);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create-classroom').post(withAuth, (req, res) => {
  const creatorEmail = res.email;
  const subjectName = req.body.subjectName;
  const newClassRoom = new ClassRoom({
    creatorEmail,
    subjectName
  });
  console.log(newClassRoom);
  newClassRoom.save()
    .then(() => res.json(newClassRoom))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/classroom').post(withAuth, (req, res) => {
  const _id = req.body._id;
  ClassRoom.findOne({"_id" : _id})
    .then(classroom => {
      if(classroom == null)
        throw "Not Found";
      res.json(classroom)})
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route(`/`)

module.exports = router;
