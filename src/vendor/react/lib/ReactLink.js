"use strict";

function r(e, t) {
    this.value = e;
    this.requestChange = t;
}

function o(e) {
    var t = {
        value: typeof e == "undefined" ? i.PropTypes.any.isRequired : e.isRequired,
        requestChange: i.PropTypes.func.isRequired
    };
    return i.PropTypes.shape(t);
}

var i = require("./React");

r.PropTypes = {
    link: o
};

module.exports = r;