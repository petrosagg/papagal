"use strict";

function r(e) {
    var t = e.trim().toLowerCase();
    if (v.test(t)) {
        if (b.test(t)) {
            return true;
        }
        return false;
    }
    return true;
}

function o(e) {
    var t = f.parse(e, true);
    if (t.hostname && (!t.protocol || y.indexOf(t.protocol) >= 0)) {
        try {
            t.hostname = m.toASCII(t.hostname);
        } catch (n) {}
    }
    return f.encode(f.format(t));
}

function i(e) {
    var t = f.parse(e, true);
    if (t.hostname && (!t.protocol || y.indexOf(t.protocol) >= 0)) {
        try {
            t.hostname = m.toUnicode(t.hostname);
        } catch (n) {}
    }
    return f.decode(f.format(t));
}

function s(e, t) {
    if (this instanceof s) {
        if (!(t || a.isString(e))) {
            t = e || {}, e = "default"
        };
        this.inline = new d();
        this.block = new p();
        this.core = new c();
        this.renderer = new l();
        this.linkify = new h();
        this.validateLink = r;
        this.normalizeLink = o;
        this.normalizeLinkText = i;
        this.utils = a;
        this.helpers = u;
        this.options = {};
        this.configure(e);
        return void (t && this.set(t));
    }
    return new s(e, t);
}

var a = require("./common/utils"), u = require("./helpers"), l = require("./renderer"), c = require("./parser_core"), p = require("./parser_block"), d = require("./parser_inline"), h = require("linkify-it"), f = require("mdurl"), m = require("punycode"), g = {
    default: require("./presets/default"),
    zero: require("./presets/zero"),
    commonmark: require("./presets/commonmark")
}, v = /^(vbscript|javascript|file|data):/, b = /^data:image\/(gif|png|jpeg|webp);/, y = [ "http:", "https:", "mailto:" ];

s.prototype.set = function(e) {
    a.assign(this.options, e);
    return this;
};

s.prototype.configure = function(e) {
    var t, n = this;
    if (a.isString(e) && (t = e, e = g[t], !e)) {
        throw new Error('Wrong `markdown-it` preset "' + t + '", check name');
    }
    if (!e) {
        throw new Error("Wrong `markdown-it` preset, can't be empty");
    }
    if (e.options) {
        n.set(e.options)
    };
    if (e.components) {
        Object.keys(e.components).forEach(function(t) {
            if (e.components[t].rules) {
                n[t].ruler.enableOnly(e.components[t].rules)
            };
        })
    };
    return this;
};

s.prototype.enable = function(e, t) {
    var n = [];
    if (!Array.isArray(e)) {
        e = [ e ]
    };
    [ "core", "block", "inline" ].forEach(function(t) {
        n = n.concat(this[t].ruler.enable(e, true));
    }, this);
    var r = e.filter(function(e) {
        return n.indexOf(e) < 0;
    });
    if (r.length && !t) {
        throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
    }
    return this;
};

s.prototype.disable = function(e, t) {
    var n = [];
    if (!Array.isArray(e)) {
        e = [ e ]
    };
    [ "core", "block", "inline" ].forEach(function(t) {
        n = n.concat(this[t].ruler.disable(e, true));
    }, this);
    var r = e.filter(function(e) {
        return n.indexOf(e) < 0;
    });
    if (r.length && !t) {
        throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
    }
    return this;
};

s.prototype.use = function(e) {
    var t = [ this ].concat(Array.prototype.slice.call(arguments, 1));
    e.apply(e, t);
    return this;
};

s.prototype.parse = function(e, t) {
    var n = new this.core.State(e, this, t);
    this.core.process(n);
    return n.tokens;
};

s.prototype.render = function(e, t) {
    t = t || {};
    return this.renderer.render(this.parse(e, t), this.options, t);
};

s.prototype.parseInline = function(e, t) {
    var n = new this.core.State(e, this, t);
    n.inlineMode = true;
    this.core.process(n);
    return n.tokens;
};

s.prototype.renderInline = function(e, t) {
    t = t || {};
    return this.renderer.render(this.parseInline(e, t), this.options, t);
};

module.exports = s;
