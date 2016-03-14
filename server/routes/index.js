var express = require("express");
var router = express.Router();
var path = require("path");

var employee = require("../modules/node_module.js");

// mongoose.connect("mongodb://localhost:27017/kappa_cats");

// var Cat = mongoose.model("Cat", {name:String});



router.post("/add", function(req,res){

    console.log("what is our request", req.body.valueA, req.body.valueB);

    var result = 0;
    var valueA = req.body.valueA;
    var valueB = req.body.valueB;
    result = parseFloat(valueA) + parseFloat(valueB);
    result = result.toString();
    res.send(result);

});

router.post("/subtract", function(req,res){

    console.log("what is our request", req.body.valueA, req.body.valueB);

    var result = 0;
    var valueA = req.body.valueA;
    var valueB = req.body.valueB;
    result = parseFloat(valueA) - parseFloat(valueB);
    result = result.toString();
    res.send(result);

});

router.post("/multiply", function(req,res){

    console.log("what is our request", req.body.valueA, req.body.valueB);

    var result = 0;
    var valueA = req.body.valueA;
    var valueB = req.body.valueB;
    result = parseFloat(valueA) * parseFloat(valueB);
    result = result.toString();
    res.send(result);

});

router.post("/divide", function(req,res){

    console.log("what is our request", req.body.valueA, req.body.valueB);

    var result = 0;
    var valueA = req.body.valueA;
    var valueB = req.body.valueB;
    result = parseFloat(valueA) / parseFloat(valueB);
    result = result.toString();
    res.send(result);

});


router.get("/*", function(req,res){
    //console.log(req.params);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
