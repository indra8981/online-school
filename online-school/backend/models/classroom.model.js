const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classRoomSchema = new Schema(
  {
    creatorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    subjectCode: {
      type: String,
      required: true,
      trim: true,
    },
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClassRoom = mongoose.model("ClassRoom", classRoomSchema);

module.exports = ClassRoom;
