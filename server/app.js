require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer')
const app = express();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const PORT = process.env.PORT || 8000

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + '-' + Date.now())
    }
  })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({ storage: storage}).single('profilePic'))
app.use(cors());

app.use(authRoutes);
app.use(userRoutes);

// Database Connection
mongoose.connect(process.env.MONGODB_STRING, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true,})
.then(()=>{
  console.log("DB Connected")
}).catch(error=>{
  console.log(error)
})

if(process.env.Node_ENV === 'production'){
  app.use(express.static('client/build'))
  // const path = require('path');
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', índex.html))
  // })
}

app.listen(PORT ,() => {
    console.log('Server is running....')
})