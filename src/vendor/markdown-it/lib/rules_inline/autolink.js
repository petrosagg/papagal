"use strict";

var r = require("../common/url_schemas"), o = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/, i = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;

module.exports = function(e, t) {
    var n, s, a, u, l, c, p = e.pos;
    if (60 !== e.src.charCodeAt(p)) {
        return false;
    }
    n = e.src.slice(p);
    if (n.indexOf(">") < 0) {
        return false;
    }
    if (i.test(n)) {
        s = n.match(i);
        if (r.indexOf(s[1].toLowerCase()) < 0) {
            return false;
        }
        u = s[0].slice(1, -1);
        l = e.md.normalizeLink(u);
        if (e.md.validateLink(l)) {
            t || (c = e.push("link_open", "a", 1), c.attrs = [ [ "href", l ] ], c = e.push("text", "", 0), 
            c.content = e.md.normalizeLinkText(u), c = e.push("link_close", "a", -1));
            e.pos += s[0].length;
            return true;
        }
        return false;
    }
    if (o.test(n)) {
        a = n.match(o);
        u = a[0].slice(1, -1);
        l = e.md.normalizeLink("mailto:" + u);
        if (e.md.validateLink(l)) {
            t || (c = e.push("link_open", "a", 1), c.attrs = [ [ "href", l ] ], c.markup = "autolink", 
            c.info = "auto", c = e.push("text", "", 0), c.content = e.md.normalizeLinkText(u), 
            c = e.push("link_close", "a", -1), c.markup = "autolink", c.info = "auto");
            e.pos += a[0].length;
            return true;
        }
        return false;
    }
    return false;
};
