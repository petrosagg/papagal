"use strict";

function r(e) {
    if (e && e.__esModule) {
        return e;
    }
    return {
        default: e
    };
}

function o(e, t) {
    var n = e[t].content, r = e[t].markup;
    return '<a class="tag">' + r + n + "</a>";
}

Object.defineProperty(global, "__esModule", {
    value: !0
});

var i = require("./parser"), s = r(i);

global["default"] = function(e, t) {
    var n = "#|＃", r = s["default"](e, "hashtag", new RegExp(n));
    e.core.ruler.push("hashtag", r);
    e.renderer.rules.hashtag = o;
};

module.exports = global["default"];