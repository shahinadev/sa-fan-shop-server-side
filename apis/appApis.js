const express = require("express");
const Product = require("../models/addProductModel");
const User = require("../models/addUserModel");
const router = express.Router();

//add a new product api
router.post("/add-product", async (req, res) => {
  const data = req.body;
  try {
    const doc = new Product(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: err });
  }
});

//add a user api
router.post("/add-user", async (req, res) => {
  const data = req.body;
  try {
    const doc = new User(data);
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
    // const result = await User.updateOne(filter, update);
    const doc = await User.findOneAndUpdate(
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
    const result = await Product.find({});
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
    const result = await User.find({ email: req.params.email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});
//get all products by id api
router.get("/products/:id", async (req, res) => {
  try {
    const result = await Product.findById({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "something is wrong.",
    });
  }
});
module.exports = router;
