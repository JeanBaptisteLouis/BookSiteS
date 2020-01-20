console.log("ZA Cursor plugin loaded");

(function($) {
  $.fn.zacursor = function(options) {
    var options = $.extend(
      {
        size1: "8px",
        size2: "20px",
        width: "4px",
        color: "rgba(0,0,0,0)",
        borderColor: "black",
        duration: 100,
        easing: "linear",
        anim: true
      },
      options
    );

    return this.each(function(e) {
      lx = e.pageX;
      ly = e.pageY;
      var container = $(this);
      $(this)
        .find("*")
        .filter(function() {
          return (
            $(this).css("cursor") !== "auto" &&
            $(this).css("cursor") !== "default" &&
            $(this).css("cursor") !== "none"
          );
        })
        .addClass("za_cursor_pointer");
      $(this)
        .find("*")
        .filter(function() {
          return $(this).css("cursor") !== "auto";
        })
        .css("cursor", "none");
      $(this).css("cursor", "none");
      $(this).append(
        "<div id='za_cursor' style='position: fixed; z-index: 1000; pointer-events:none; overflow: visible;'><div style='position: absolute; top: 0px; left: 0px; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%); border-radius: 1000px; width: " +
          options.size1 +
          "; height: " +
          options.size1 +
          ";  max-width: " +
          options.size2 +
          "; max-height: " +
          options.size2 +
          "; background: " +
          options.color +
          "; border-style: solid; border-width: " +
          options.width +
          "; border-color: " +
          options.borderColor +
          ";'></div></div>"
      );
      $(this).mousemove(function(event) {
        $(this)
          .find("#za_cursor")
          .css("left", event.clientX)
          .css("top", event.clientY);
        if (options.anim == true) {
          dx = Math.abs(lx - event.clientX);
          dy = Math.abs(ly - event.clientY);
          d = Math.sqrt(dx * dx + dy * dy);
          dir_deg =
            Math.atan2(ly - event.clientY, lx - event.clientX) * 180 / Math.PI;
          $(this)
            .find("#za_cursor")
            .css("transform", "rotate(" + dir_deg + "deg)")
            .css("-webkit-transform", "rotate(" + dir_deg + "deg)");
          if (d >= 10 && d <= 50) {
            $(this)
              .find("#za_cursor")
              .children()
              .css("transform", "translate(-50%, -50%) scaleX(" + d / 10 + ")")
              .css(
                "-webkit-transform",
                "translate(-50%, -50%) scaleX(" + d / 10 + ")"
              );
          } else if (d > 50) {
            $(this)
              .find("#za_cursor")
              .children()
              .css("transform", "translate(-50%, -50%) scaleX(5)")
              .css("-webkit-transform", "translate(-50%, -50%) scaleX(5)");
          } else {
            $(this)
              .find("#za_cursor")
              .children()
              .css("transform", "translate(-50%, -50%) scaleX(1)")
              .css("-webkit-transform", "translate(-50%, -50%) scaleX(1)");
          }
          lx = event.clientX;
          ly = event.clientY;
        }
      });
      $(this)
        .mouseenter(function() {
          $(this)
            .find("#za_cursor")
            .show();
        })
        .mouseleave(function() {
          $(this)
            .find("#za_cursor")
            .hide();
        });
      $(this)
        .on("mouseover", ".za_cursor_pointer", function(event) {
          container
            .find("#za_cursor")
            .children()
            .stop()
            .animate(
              { width: options.size2, height: options.size2 },
              { duration: options.duration, easing: options.easing }
            );
        })
        .on("mouseout", ".za_cursor_pointer", function(event) {
          container
            .find("#za_cursor")
            .children()
            .stop()
            .animate(
              { width: options.size1, height: options.size1 },
              { duration: options.duration, easing: options.easing }
            );
        });
    });
  };
})(jQuery);

$("html").zacursor({
  color: "black",
  borderColor: "cyan",
  size1: "20px",
  size2: "30px",
  anim: true
});
