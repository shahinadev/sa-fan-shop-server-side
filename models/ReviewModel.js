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
  review_text: {
    type: String,
    required: true,
  },
  review_date: {
    type: String,
    required: true,
  },
});
const ReviewModel = mongoose.model("Review", ReviewSchema);
module.exports = ReviewModel;
