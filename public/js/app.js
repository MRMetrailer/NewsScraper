$(document).ready(function () {
    $(".save-button").on("click", function () {
        var id = ($(this).data("id"));
        var title = ($(this).data("title"));
        var link = ($(this).data("link"));
        var summary = ($(this).data("summary"));

        var savedArticle = {
            title: title,
            link: link,
            summary: summary
        };

        $.post("/api/save/" + id, savedArticle)
            .then(function () {
                console.log("article saved")
            });
        location.reload();
    });

    $(".delete-article-button").on("click", function () {
        var id = ($(this).data("id"));
        var title = ($(this).data("title"));
        var link = ($(this).data("link"));
        var summary = ($(this).data("summary"));

        var articleToPutBack = {
            title: title,
            link: link,
            summary: summary
        };

        $.post("/api/delete-save/" + id, articleToPutBack)
            .then(function () {
                console.log("article saved")
            });
        location.reload();
    });

    $(".delete-comment-button").on("click", function () {
        var id = ($(this).data("id"));
        $.post("/api/delete-comment/" + id)
            .then(function () {
                location.reload();
            })
    });
});