const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  dateRegistered: Date,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  image: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}