var r = require("./../lib/Modernizr"), o = require("./../lib/prefixes"), i = require("./../lib/testStyles");

r.addTest("touchevents", function() {
    var e;
    if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) {
        e = !0;
    } else {
        var t = [ "@media (", o.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}" ].join("");
        i(t, function(t) {
            e = t.offsetTop === 9;
        });
    }
    return e;
});
