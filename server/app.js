var express = require("express");
var app = express();
var index = require("./routes/index.js");
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", index);

var port = process.env.PORT || 3000;


app.listen(port, function(){
    console.log("Listening on port 3000");
});
