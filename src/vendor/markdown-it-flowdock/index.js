"use strict";

function r(e) {
    if (e && e.__esModule) {
        return e;
    }
    return {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: true
});

var o = require("./hashtag"), i = r(o), s = require("./mention"), a = r(s), u = require("./url"), l = r(u);

exports["default"] = function(e, t) {
    i["default"](e, t);
    a["default"](e, t);
    l["default"](e, t);
};

module.exports = exports["default"];
