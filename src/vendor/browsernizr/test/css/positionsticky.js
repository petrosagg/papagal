var r = require("./../../lib/Modernizr"), o = require("./../../lib/createElement"), i = require("./../../lib/prefixes");

r.addTest("csspositionsticky", function() {
    var e = "position:", t = "sticky", n = o("a"), r = n.style;
    r.cssText = e + i.join(t + ";" + e).slice(0, -e.length);
    return -1 !== r.position.indexOf(t);
});
