const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username : {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
  },
  userType : {
    type : Number,
    require : true,
    trim: true,
  },
  name : {
    type : String, 
    required : true,
    trim : true,
  },
  email : {
    type : String, 
    required : true,
    trim : true,
  },
  phone : {
    type : Number, 
    required : true,
    trim : true,
  },
  school : {
    type : String, 
    required : true,
    trim : true,
  },
  roll : {
    type : String, 
    required : true,
    trim : true,
  } 
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
