const router = require("express").Router();
const withAuth = require("../middleware");
let ClassRoom = require("../models/classroom.model");
let StudentAdd = require("../models/classroomStudent.model");

router.route("/teacher").get(withAuth, (req, res) => {
  const creatorEmail = res.email;
  ClassRoom.find({ creatorEmail: creatorEmail })
    .then((classrooms) => {
      res.json(classrooms);
      console.log(classrooms);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/student").get(withAuth, (req, res) => {
  const studentEmail = res.email;
  StudentAdd.aggregate([
    { $match: { studentEmail: studentEmail } },
    { $addFields: { classroom_id: { $toObjectId: "$classRoomId" } } },
    {
      $lookup: {
        from: "classrooms",
        localField: "classroom_id",
        foreignField: "_id",
        as: "classroomsDetails",
      },
    },
  ])
    .then((classrooms) => {
      res.json(classrooms);
      console.log(classrooms);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/create-classroom").post(withAuth, (req, res) => {
  const creatorEmail = res.email;
  const subjectCode = req.body.subjectCode;
  const subjectName = req.body.subjectName;
  const academicYear = req.body.academicYear;
  const newClassRoom = new ClassRoom({
    creatorEmail,
    subjectCode,
    subjectName,
    academicYear,
  });
  console.log(newClassRoom);
  newClassRoom
    .save()
    .then(() => res.json(newClassRoom))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:classRoomId").get(withAuth, (req, res) => {
  const _id = req.params.classRoomId;
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
  emailsList.forEach((email) => {
    var studentEmail = email.trim();
    const newStudentAdd = new StudentAdd({
      studentEmail,
      classRoomId,
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
