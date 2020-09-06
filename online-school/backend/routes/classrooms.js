const router = require('express').Router();
let ClassRoom = require('../models/classroom.model');

router.route('/').post((req, res) => {
  const creatorEmail = req.body.creatorEmail;
  ClassRoom.find({"creatorEmail" : creatorEmail})
    .then(classrooms => res.json(classrooms))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create-classroom').post((req, res) => {
  const creatorEmail = req.body.creatorEmail;
  const subjectName = req.body.subjectName;

  const newClassRoom = new ClassRoom({
    creatorEmail,
    subjectName
  });

  newClassRoom.save()
    .then(() => res.json('Classroom created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/classroom').post((req, res) => {
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
