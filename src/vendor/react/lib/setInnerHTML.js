"use strict";

var r = require("./ExecutionEnvironment"), o = /^[ \r\n\t\f]/, i = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/, s = function(e, t) {
    e.innerHTML = t;
};

if (typeof MSApp != "undefined" && MSApp.execUnsafeLocalFunction) {
    s = function(e, t) {
        MSApp.execUnsafeLocalFunction(function() {
            e.innerHTML = t;
        });
    }
}

if (r.canUseDOM) {
    var a = document.createElement("div");
    a.innerHTML = " ";
    if (a.innerHTML === "") {
        s = function(e, t) {
            if (e.parentNode) {
                e.parentNode.replaceChild(e, e)
            }
            if (o.test(t) || t[0] === "<" && i.test(t)) {
                e.innerHTML = "\ufeff" + t;
                var n = e.firstChild;
                n.data.length === 1 ? e.removeChild(n) : n.deleteData(0, 1);
            } else e.innerHTML = t;
        }
    };
}

module.exports = s;
