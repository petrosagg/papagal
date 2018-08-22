"use strict";

function r() {
    this.rules = o({}, a);
}

var o = require("./common/utils").assign, i = require("./common/utils").unescapeAll, s = require("./common/utils").escapeHtml, a = {};

a.code_inline = function(e, t) {
    return "<code>" + s(e[t].content) + "</code>";
};

a.code_block = function(e, t) {
    return "<pre><code>" + s(e[t].content) + "</code></pre>\n";
};

a.fence = function(e, t, n, r, o) {
    var a, u = e[t], l = u.info ? i(u.info).trim() : "", c = "";
    if (l) {
        c = l.split(/\s+/g)[0], u.attrPush([ "class", n.langPrefix + c ])
    };
    a = n.highlight ? n.highlight(u.content, c) || s(u.content) : s(u.content);
    return "<pre><code" + o.renderAttrs(u) + ">" + a + "</code></pre>\n";
};

a.image = function(e, t, n, r, o) {
    var i = e[t];
    i.attrs[i.attrIndex("alt")][1] = o.renderInlineAsText(i.children, n, r);
    return o.renderToken(e, t, n);
};

a.hardbreak = function(e, t, n) {
    if (n.xhtmlOut) {
        return "<br />\n";
    }
    return "<br>\n";
};

a.softbreak = function(e, t, n) {
    if (n.breaks) {
        if (n.xhtmlOut) {
            return "<br />\n";
        }
        return "<br>\n";
    }
    return "\n";
};

a.text = function(e, t) {
    return s(e[t].content);
};

a.html_block = function(e, t) {
    return e[t].content;
};

a.html_inline = function(e, t) {
    return e[t].content;
};

r.prototype.renderAttrs = function(e) {
    var t, n, r;
    if (!e.attrs) {
        return "";
    }
    for (r = "", t = 0, n = e.attrs.length; n > t; t++) {
        r += " " + s(e.attrs[t][0]) + '="' + s(e.attrs[t][1]) + '"';
    }
    return r;
};

r.prototype.renderToken = function(e, t, n) {
    var r, o = "", i = !1, s = e[t];
    if (s.hidden) {
        return "";
    }
    if (s.block && -1 !== s.nesting && t && e[t - 1].hidden) {
        o += "\n"
    };
    o += (s.nesting === -1 ? "</" : "<") + s.tag;
    o += this.renderAttrs(s);
    if (s.nesting === 0 && n.xhtmlOut) {
        o += " /"
    };
    if (s.block) {
        i = !0, s.nesting === 1 && t + 1 < e.length && (r = e[t + 1], r.type === "inline" || r.hidden ? i = !1 : r.nesting === -1 && r.tag === s.tag && (i = !1))
    };
    return o += i ? ">\n" : ">";
};

r.prototype.renderInline = function(e, t, n) {
    for (var r, o = "", i = this.rules, s = 0, a = e.length; a > s; s++) {
        r = e[s].type;
        o += typeof i[r] != "undefined" ? i[r](e, s, t, n, this) : this.renderToken(e, s, t);
    }
    return o;
};

r.prototype.renderInlineAsText = function(e, t, n) {
    for (var r = "", o = this.rules, i = 0, s = e.length; s > i; i++) {
        e[i].type === "text" ? r += o.text(e, i, t, n, this) : e[i].type === "image" && (r += this.renderInlineAsText(e[i].children, t, n));
    }
    return r;
};

r.prototype.render = function(e, t, n) {
    var r, o, i, s = "", a = this.rules;
    for (r = 0, o = e.length; o > r; r++) {
        i = e[r].type;
        s += i === "inline" ? this.renderInline(e[r].children, t, n) : typeof a[i] != "undefined" ? a[e[r].type](e, r, t, n, this) : this.renderToken(e, r, t, n);
    }
    return s;
};

module.exports = r;
