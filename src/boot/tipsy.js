Modernizr.touchevents ? $.fn.tipsy = function() {} : (_.extend($.fn.tipsy.defaults, {
    delayIn: 1500,
    delayOut: 100
}), $.fn.tipsy.elementOptions = function(e, t) {
    var n;
    n = {
        gravity: $(e).data("tipsy-gravity"),
        html: $(e).data("tipsy-html")
    };
    return $.extend({}, t, n);
}, $(".tipsy-tooltip").tipsy({
    live: !0
}), $(window).on("flowdock-start", function() {
    return Flowdock.app.router.on("all", function() {
        return $(".tipsy").remove();
    });
}));