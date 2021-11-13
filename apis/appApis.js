const express = require("express");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const OrderModel = require("../models/OrderModel");
const ReviewModel = require("../models/ReviewModel");
const router = express.Router();

//add a new product api
router.post("/add-product", async (req, res) => {
  const data = req.body;
  try {
    const doc = new ProductModel(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (err) {
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
    res.send({
      message: "Email address already added..",
    });
  }
});

// make admin api by email
router.put("/make-admin", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const doc = await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          role: "admin",
        },
      }
    );
    res.status(200).json(doc);
  } catch (err) {
    res.status(500).send({ message: "something is wrong." });
  }
});

//get all products api
router.get("/products", async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  let products;
  let count;
  try {
    if (page) {
      products = await ProductModel.find(
        {},
        {},
        { skip: page * size, limit: parseInt(size) }
      );
      count = await ProductModel.countDocuments({});
    } else {
      products = await ProductModel.find({});
      count = await ProductModel.countDocuments({});
    }
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
  res.status(200).json({
    count,
    products,
  });
});

//get single user by email api
router.get("/user/:email", async (req, res) => {
  if (req.params.email.length < 0) return;
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
      { $set: { order_status: newStatus } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something is wrong...!" });
  }
});

//delete order api
router.delete("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await OrderModel.findByIdAndDelete({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something is wrong...!" });
  }
});

//save user review api
router.post("/reviews", async (req, res) => {
  const data = req.body;
  try {
    const doc = new ReviewModel(data);
    const result = await doc.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
});

//get all reviews api
router.get("/reviews", async (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  let reviews;
  let count;
  try {
    if (page) {
      reviews = await ReviewModel.find(
        {},
        {},
        { skip: page * size, limit: parseInt(size) }
      );
      count = await ReviewModel.countDocuments({});
    } else {
      reviews = await ReviewModel.find({});
      count = await ReviewModel.countDocuments({});
    }
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
  res.status(200).json({
    count,
    reviews,
  });
});

//get reviews by email api
router.get("/reviews/:email", async (req, res) => {
  try {
    const result = await ReviewModel.find({ email: req.params.email });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something is wrong...!",
    });
  }
});

//delete review api
router.delete("/reviews/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await ReviewModel.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Something is wrong...!" });
  }
});

module.exports = router;
