const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./apis/appApis");
const PORT = process.env.PORT || 8080;
//express app
const app = express();
//dotenv config
dotenv.config();
//connect to database
mongoose.connect(process.env.DB_URL, (err) => {
  console.log(err);
});
//uses middleware
app.use(express.json());
app.use(cors());
app.use(router);

//create express server & root path
app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.listen(PORT, () => {
  console.log("backed sever is running..");
});
