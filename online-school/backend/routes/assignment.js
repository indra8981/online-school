const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const withAuth = require('../middleware');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

const Assignment = require("../models/assignment.model.js");
const ClassRoom =require("../models/classroom.model.js");

router.get("/:classroomId/", withAuth,async (req, res) => {
  const classroomId=req.params.classroomId;
  const creatorEmail=await ClassRoom.find({"_id":classroomId}).select("creatorEmail");
  if(res.email!=creatorEmail[0]["creatorEmail"])
  return res.sendStatus(404);
  Assignment.find({"classroomId":classroomId})
    .select("name _id assignmentImage")
    .exec()
    .then(docs => {
      const response = {
        assignments: docs.map(doc => {
          return {
            name: doc.name,
            assignmentImage: doc.assignmentImage,
            _id: doc._id
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", upload.single('assignmentImage'), (req, res, next) => {
  const assignment = new Assignment({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    classroomId:req.body.classroomId,
    assignmentImage: req.file.path
  });
  assignment
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created assignment successfully",
        createdAssignment: {
            name: result.name,
            _id: result._id,
            request: {
                type: 'GET',
                url: "http://localhost:3000/assignment/" + result._id
            }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:assignmentId", (req, res, next) => {
  const id = req.params.assignmentId;
  Assignment.findById(id)
    .select('name _id assignmentImage')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:assignmentId", (req, res, next) => {
  const id = req.params.assignmentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Assignment.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Assignment updated',
          request: {
              type: 'GET',
              url: 'http://localhost:3000/assignment/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.delete("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//           message: 'Product deleted',
//           request: {
//               type: 'POST',
//               url: 'http://localhost:3000/products',
//               body: { name: 'String', price: 'Number' }
//           }
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;
