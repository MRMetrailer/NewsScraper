var express = require("express")
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;
var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var apiRoutes = require("./routes/apiRoutes.js");
app.use(apiRoutes);

app.listen(PORT, function() {
    console.log("App listening at localhost:" + PORT);
});