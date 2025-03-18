//jshint esversion:6

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const userSchema = new mongoose.Schema({
  UserId: String,
  local: {
    password: String,
  },
  Name: String,
  Email: String,
  loginType: {
    type: String
  },
  isEmployee: {
  default: false,
  type: Boolean
  },
  emp_ministry: {
    default: null,
    type: String
  },
  aadhar_number:{
    type: Number,
  }
// grievances: [{
//   type: mongoose.Types.ObjectId,
//   ref: 'Grievance'
// }],
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", userSchema);
