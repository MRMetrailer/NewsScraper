var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var savedArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    articleComments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

var SavedArticle = mongoose.model("SavedArticle", savedArticleSchema);

module.exports = SavedArticle;