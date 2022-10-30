const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = new mongoose.model(`User`, userSchema);
