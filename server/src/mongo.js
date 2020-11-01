require("dotenv").config();
const mongoose = require("mongoose");


const uri =  "mongodb+srv://Wamiq:dbconnect@cluster0.mlsth.mongodb.net/trello?retryWrites=true&w=majority"  || "mongodb://localhost/trello";

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
