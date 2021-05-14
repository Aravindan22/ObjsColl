const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const MONGO_DB_URI = process.env.MONGO_DB_URI;

app.use(bodyParser.urlencoded({ extended: true }), function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const ObjectSchema = new mongoose.Schema({
  object: { type: String, unique: true },
});
const Object_ = mongoose.model("object", ObjectSchema);



app.post("/", function (req, res) {
  const obj = req.body.object.toLowerCase();
  Object_.findOne({ object: obj }, function (err, result) {
    if (err) {
      res.send(err);
      // console.log(err);
    } else if (result !== null) {
      res.send("Object Exists");
    } else {
      Object_.create({ object: obj }, function (err1, result1) {
        if (err1) {
          console.log(err1);
          res.send(err1);
        } else {
          res.send("Object Added");
        }
      });
    }
  });
});

app.get("/getObjects",function(req,res){
    let objectsJSON = {objects:[]}
    Object_.find({},function(err,result){
        if(err){
            // res.send(err);
            console.log(err);
        }else if (result !==null){
            result.forEach(element => {
                objectsJSON.objects.push(element.object);
            });
            res.send(objectsJSON);
        }else{
            res.send(objects);
        }
    });
});
app.get("/", function (req, res) {
    res.send("Hi");
  });
  
app.listen(process.env.PORT, function () {
  console.log("@" + process.env.PORT);
});
