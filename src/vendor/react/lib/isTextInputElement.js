"use strict";

function r(e) {
    return e && (e.nodeName === "INPUT" && o[e.type] || e.nodeName === "TEXTAREA");
}

var o = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

module.exports = r;