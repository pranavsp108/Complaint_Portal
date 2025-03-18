//jshint esversion:6

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const gSchema = new mongoose.Schema({
  Ministry: String,
  Main_category: String,
  Sub_category: String,
  Description: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  date_posted:{
    type: Date
  },
  status: {
    type: String,
    default: 'Submitted'
  },
    uploadfile:Object
});


module.exports = mongoose.model("Grievance", gSchema);
