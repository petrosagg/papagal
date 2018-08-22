"use strict";

function r(e) {
    return i[e];
}

function o(e) {
    return ("" + e).replace(s, r);
}

var i = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    '"': "&quot;",
    "'": "&#x27;"
}, s = /[&><"']/g;

module.exports = o;
