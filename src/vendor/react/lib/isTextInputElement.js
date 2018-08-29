"use strict";

function r(e) {
    return e && (e.nodeName === "INPUT" && o[e.type] || e.nodeName === "TEXTAREA");
}

var o = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
};

module.exports = r;
