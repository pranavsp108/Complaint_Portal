//jshint esversion:6

const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  name : String,
  message : String,
  type_of_ministry: String
});

module.exports = mongoose.model("Message", messageSchema);