const router = require("express").Router();
const withAuth = require("../middleware");
let ClassRoom = require("../models/classroom.model");
let StudentAdd = require("../models/classroomStudent.model");

router.route("/").get(withAuth, (req, res) => {
  const creatorEmail = res.email;
  ClassRoom.find({ creatorEmail: creatorEmail })
    .then((classrooms) => {
      res.json(classrooms);
      console.log(classrooms);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create-classroom").post(withAuth, (req, res) => {
  const creatorEmail = res.email;
  const subjectName = req.body.subjectName;
  const newClassRoom = new ClassRoom({
    creatorEmail,
    subjectName,
  });
  console.log(newClassRoom);
  newClassRoom
    .save()
    .then(() => res.json(newClassRoom))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/classroom").post(withAuth, (req, res) => {
  const _id = req.body._id;
  ClassRoom.findOne({ _id: _id })
    .then((classroom) => {
      if (classroom == null) throw "Not Found";
      res.json(classroom);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addStudents/:classRoomId").post(withAuth, (req, res) => {
  console.log(req.body);
  var emailsList = req.body.emailsList.split(",");
  var classRoomId = req.params.classRoomId;
  console.log(classRoomId);
  console.log(emailsList);
  emailsList.forEach((studentEmail) => {
    const newStudentAdd = new StudentAdd({
      classRoomId,
      studentEmail,
    });
    console.log(newStudentAdd);
    newStudentAdd
      .save()
      .then(() => res.json(newStudentAdd))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.route(`/`);

module.exports = router;
