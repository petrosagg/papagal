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

Object.defineProperty(exports, "__esModule", {
    value: true
});

var i = require("./parser"), s = r(i);

exports["default"] = function(e, t) {
    var n = "#|＃", r = s["default"](e, "hashtag", new RegExp(n));
    e.core.ruler.push("hashtag", r);
    e.renderer.rules.hashtag = o;
};

module.exports = exports["default"];
