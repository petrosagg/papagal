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
    return '<a class="mention">' + r + n + "</a>";
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var i = require("./parser"), s = r(i);

exports["default"] = function(e, t) {
    var n = "@|＠", r = s["default"](e, "mention", new RegExp(n));
    e.core.ruler.push("mention", r);
    e.renderer.rules.mention = o;
};

module.exports = exports["default"];
