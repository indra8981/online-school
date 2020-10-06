const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    assignmentImage: { type: String, required: true }
});

module.exports = mongoose.model('Assignment', assignmentSchema);
