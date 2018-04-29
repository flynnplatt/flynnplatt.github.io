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

function closeImageViewer() {
  $(".image-viewer").each(function() {
    var viewer = $(this);
    if (viewer.hasClass("active")) {
      viewer.removeClass("active");
    }
    viewer.find("img").each(function() {
      var img = $(this);
      img.attr("src", "");
    });
    viewer.find(".image-view").each(function() {
      var view = $(this);
      view.css("background-image", "none");
    });
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
      closeImageViewer();
    }
  });

  $(".image-trigger").on("click", function(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    closeImageViewer();

    var trigger = $(this);
    var src = trigger.attr("href");
    $(".image-viewer").each(function() {
      var viewer = $(this);

      viewer.find(".loading").each(function() {
        var loading = $(this);
        if (loading.hasClass("hidden")) {
          loading.removeClass("hidden");
        }
      });

      viewer.find("img").each(function() {
        var img = $(this);
        img.load(function(loadEvt) {
          viewer.find(".image-view").each(function() {
            var view = $(this);
            view.css("background-image", "url(" + src + ")");
          });
          viewer.find(".loading").each(function() {
            var loading = $(this);
            if (!loading.hasClass("hidden")) {
              loading.addClass("hidden");
            }
          });
        });
        img.attr("src", src);
      });
      if (!viewer.hasClass("active")) {
        viewer.addClass("active");
      }
    });
    $(".image-viewer .close-btn").on("click", function(evt) {
      closeImageViewer();
    });
  });

  $(document).click(function(event) {
    if (!$(event.target).closest(".image-viewer").length) {
      $(".image-viewer").removeClass("active");
    }
  });
}

$(document).ready(function() {
  createListeners();
});
