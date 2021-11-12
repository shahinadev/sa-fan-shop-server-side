const mongoose = require("mongoose");
const { Schema } = mongoose;
const ProductSchema = new Schema({
  product_name: {
    type: String,
    min: 3,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: String,
    required: true,
  },
  product_desc: {
    type: String,
    required: true,
  },
  added_by: {
    type: String,
    required: true,
  },
  added_date: {
    type: String,
    required: true,
  },
});
const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
