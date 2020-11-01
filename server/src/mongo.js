require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost/trello";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  //we're connected!
  console.log("Mongoose online");
});
