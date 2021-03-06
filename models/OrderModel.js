const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
    required: true,
  },
  product_quantity: {
    type: String,
    required: true,
  },
  delivery_address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  order_status: {
    type: String,
    default: "pending",
  },
  order_date: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
