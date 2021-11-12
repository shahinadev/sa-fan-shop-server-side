const express = require("express");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");
const router = express.Router();

//add a new product api
router.post("/add-product", async (req, res) => {
  const data = req.body;
  try {
    const doc = new ProductModel(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

//add user api
router.post("/add-user", async (req, res) => {
  const data = req.body;
  try {
    const doc = new UserModel(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (err) {
    if (err.keyPattern.email > 0) {
      res.send({
        message: "Email address already added..",
      });
    }
  }
});

// make admin api by email
router.put("/make-admin/", async (req, res) => {
  const { email } = req.body;
  if (!email.length > 0) return;
  try {
    const doc = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { role: "admin" } },
      { new: true }
    );
    res.status(200).json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

//get all products api
router.get("/products", async (req, res) => {
  try {
    const result = await ProductModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

//get single user by email api
router.get("/user/:email", async (req, res) => {
  console.log(req.params);
  try {
    const result = await UserModel.find({ email: req.params.email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

//get single product by id api
router.get("/products/:id", async (req, res) => {
  try {
    const result = await ProductModel.findById({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "something is wrong.",
    });
  }
});

//delete single product by id api
router.delete("/products/:id", async (req, res) => {
  try {
    const result = await ProductModel.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "something is wrong.",
    });
  }
});

//save user order api
router.post("/orders", async (req, res) => {
  const data = req.body;
  try {
    const doc = new OrderModel(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
  res.status(200).send(data);
});

//get all orders api
router.get("/orders", async (req, res) => {
  try {
    const result = await OrderModel.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
});

//get orders by email api
router.get("/orders/:email", async (req, res) => {
  try {
    const result = await OrderModel.find({ email: req.params.email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
});

//update order status api
router.put("/orders/", async (req, res) => {
  const { id, newStatus } = req.body;
  try {
    const result = await OrderModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: newStatus } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something is wrong...!" });
  }
});

//delete order api
router.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await OrderModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something is wrong...!" });
  }
});

module.exports = router;
