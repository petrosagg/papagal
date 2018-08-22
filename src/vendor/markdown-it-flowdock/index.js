"use strict";

function r(e) {
    if (e && e.__esModule) {
        return e;
    }
    return {
        default: e
    };
}

Object.defineProperty(global, "__esModule", {
    value: !0
});

var o = require("./hashtag"), i = r(o), s = require("./mention"), a = r(s), u = require("./url"), l = r(u);

global["default"] = function(e, t) {
    i["default"](e, t);
    a["default"](e, t);
    l["default"](e, t);
};

module.exports = global["default"];