function closeReelViewers() {
    $(".reel-viewer").each(function() {
        var el = $(this);
        if (el.hasClass("active")) {
            el.removeClass("active");
            setTimeout(function() {
                el.find("iframe").attr("src", "");
            }, 500);
        }
    });
}

function createListeners() {
    $(".reel-trigger").on("click", function(evt) {
        closeReelViewers();
        var targetReel = $("#" + $(this).attr("rel"));
        targetReel.find("iframe").attr("src", targetReel.attr("rel"));
        targetReel.addClass("active");
    });

    $(".reel-viewer-close").on("click", function(evt) {
        closeReelViewers();
    });

    $(".reel-viewer").on("click", function(evt) {
        evt.stopPropagation();
        closeReelViewers();
    });

    $(document).keyup(function(evt) {
        if (evt.keyCode == 27) {
            closeReelViewers();
        }
    });
}

$(document).ready(function() {
    createListeners();
});
