var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var allArticlesSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    }
});

var AllArticle = mongoose.model("AllArticle", allArticlesSchema);

module.exports = AllArticle;