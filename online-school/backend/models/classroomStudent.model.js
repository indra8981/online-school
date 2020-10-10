const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentAddSchema = new Schema(
  {
    classRoomId: {
      type: String,
      required: true,
      trim: true,
    },
    studentEmail: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentAdd = mongoose.model("StudentAdd", StudentAddSchema);

module.exports = StudentAdd;
