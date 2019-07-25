var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models/index.js");
var app = express();
var router = express.Router();

// Scrape
app.get("/scrape", function (req, res) {

    axios.get("https://www.mlssoccer.com").then(function (response) {
        var $ = cheerio.load(response.data);

        $("article h2").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");

            db.AllArticle.create(result)
                .then(function (dbAllArticle) {
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });
        res.redirect("back");
    });
});

// All Articles
app.get("/allArticles", function (req, res) {
    db.AllArticle.find({})
        .then(function (results) {
            res.render("index", { articles: results });
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Saved Articles
app.get("/savedArticles", function (req, res) {
    db.SavedArticle.find({})
        .populate("articleComments")
        .then(function (articles) {
            res.render("saved", { articles: articles });
        })
        .catch(function (err) {
            res.json(err);
        });
});

// Update Saved Articles
app.post("/api/save/:id", function(req,res) {
    db.SavedArticle.create({
        "title": req.body.title,
        "link": req.body.link,
        "summary": req.body.summary
    });

    db.AllArticle.remove({
        _id: req.params.id
    },
    function(error, removed) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("article removed");
        }
    });
});

// Update All Articles
app.post("/api/delete-save/:id", function(req,res) {
    db.AllArticle.create({
        "title": req.body.title,
        "link": req.body.link,
        "summary": req.body.summary
    });
    db.SavedArticle.remove({
        _id: req.params.id
    }, 
    function(error, removed) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log("article removed");
        }
    });
});

// Save Comment
app.post("/api/submit/:id", function(req,res) {
    db.Comment.create({
        "body": req.body.comment
    })
    .then(function(data) {
        return db.SavedArticle.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { articleComments: data._id } }, { new: true }
        );
    })
    res.redirect("back");
});

// Delete Comment
app.post("/api/delete-comment/:id", function(req,res) {
    db.Comment.remove({
        "_id": req.params.id
    }, 
    function(error, removed) {
        if (error) {
            res.send(error);
        } else {
            res.redirect("back");
        }
    })
});

module.exports = router;