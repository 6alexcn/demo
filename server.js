const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const users = require("./routes/api/users");
const profiles = require("./routes/api/profiles");
const db = require("./config/keys").mongoURI;

//使用bodyparser的中间件
app.use (bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

mongoose.connect(db)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));

app.get("/", (req,res)=>{
  res.send('hello world');
}) 

//使用routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);

app.use(express.static(path.join(__dirname, './dist')));
console.log("11111111111", __dirname)

const port = process.env.PORT || 5000;

app.listen(port ,() =>{
  console.log('Server running on ' + port);
})