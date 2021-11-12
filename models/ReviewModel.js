const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReviewSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String,
    default: "",
  },
  rating: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  review_date: {
    type: String,
    required: true,
  },
});
const ReviewModel = mongoose.model("user", ReviewSchema);
module.exports = ReviewModel;
