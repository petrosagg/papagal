var r, o, i, s;

o = require("underscore");

s = function(e, t) {
    return e[t].content;
};

i = {};

i.code_inline = s;

i.code_block = function(e, t, n, r) {
    return e[t].content + "\n";
};

i.fence = function(e, t, n, r, o) {
    return e[t].content + "\n";
};

i.image = function(e, t, n, r, o) {
    return token.attrIndex("alt");
};

i.hardbreak = function() {
    return "\n";
};

i.softbreak = function() {
    return "\n";
};

i.text = s;

i.html_block = s;

i.html_inline = s;

i.mention = i.hashtag = function(e, t, n, r) {
    var o, i;
    i = e[t].content;
    o = e[t].markup;
    return "" + o + i;
};

r = function() {
    function e() {
        this.rules = o.extend({}, i);
    }
    e.prototype.renderAttrs = function() {
        return "";
    };
    e.prototype.renderToken = function(e, t, n) {
        var r, o, i, s;
        i = "";
        r = !1;
        s = e[t];
        if (s.hidden) {
            return "";
        }
        if (s.block && -1 !== s.nesting && t && e[t - 1].hidden) {
            i += "\n"
        };
        if (s.block) {
            r = !0, s.nesting === 1 && (t + 1 < e.length ? (o = e[t + 1], (o.type === "inline" || o.hidden) && (r = !1)) : o.nesting === -1 && o.tag === s.tag && (r = !1))
        };
        if (r) {
            i += "\n"
        };
        return i;
    };
    e.prototype.renderInline = function(e, t, n) {
        var r, o, i, s, a, u;
        for (s = "", r = o = 0, i = e.length; i > o; r = ++o) {
            a = e[r];
            u = e[r].type;
            s += typeof this.rules[u] != "undefined" ? this.rules[u](e, r, t, n, this) : this.renderToken(e, r, t);
        }
        return s;
    };
    e.prototype.renderInlineAsText = function(e, t, n) {
        var r, o, i, s, a;
        for (s = "", r = o = 0, i = e.length; i > o; r = ++o) {
            a = e[r];
            e[r].type === "text" ? s += this.rules.text(e, r, t, n, this) : e[r].type === "image" && (s += this.renderInlineAsText(e[r].children, t, n));
        }
        return s;
    };
    e.prototype.render = function(e, t, n) {
        var r, o, i, s, a, u;
        for (s = "", r = o = 0, i = e.length; i > o; r = ++o) {
            a = e[r];
            u = e[r].type;
            s += u === "inline" ? this.renderInline(e[r].children, t, n) : typeof this.rules[u] != "undefined" ? this.rules[e[r].type](e, r, t, n, this) : this.renderToken(e, r, t, n);
        }
        return s;
    };
    return e;
}();

module.exports = r;