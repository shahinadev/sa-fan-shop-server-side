const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  added_date: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
