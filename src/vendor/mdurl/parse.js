"use strict";

function r() {
    this.protocol = null;
    this.slashes = null;
    this.auth = null;
    this.port = null;
    this.hostname = null;
    this.hash = null;
    this.search = null;
    this.pathname = null;
}

function o(e, t) {
    if (e && e instanceof r) {
        return e;
    }
    var n = new r();
    n.parse(e, t);
    return n;
}

var i = /^([a-z0-9.+-]+:)/i, s = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, u = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], l = [ "{", "}", "|", "\\", "^", "`" ].concat(u), c = [ "'" ].concat(l), p = [ "%", "/", "?", ";", "#" ].concat(c), d = [ "/", "?", "#" ], h = 255, f = /^[+a-z0-9A-Z_-]{0,63}$/, m = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, g = {
    javascript: !0,
    "javascript:": !0
}, v = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    "http:": !0,
    "https:": !0,
    "ftp:": !0,
    "gopher:": !0,
    "file:": !0
};

r.prototype.parse = function(e, t) {
    var n, r, o, s, u, l = e;
    l = l.trim()
    if (!t && e.split("#").length === 1) {
        var c = a.exec(l);
        if (c) {
            this.pathname = c[1];
            if (c[2]) {
                this.search = c[2]
            };
            return this;
        }
    }
    var b = i.exec(l);
    if (b) {
        b = b[0], o = b.toLowerCase(), this.protocol = b, l = l.substr(b.length)
    }
    if (t || b || l.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        u = l.substr(0, 2) === "//", !u || b && g[b] || (l = l.substr(2), this.slashes = !0)
    }
    if (!g[b] && (u || b && !v[b])) {
        var y = -1;
        for (n = 0; n < d.length; n++) {
            s = l.indexOf(d[n]);
            if (-1 !== s && (y === -1 || y > s)) {
                y = s
            };
        }
        var _, w;
        for (w = y === -1 ? l.lastIndexOf("@") : l.lastIndexOf("@", y), -1 !== w && (_ = l.slice(0, w), 
        l = l.slice(w + 1), this.auth = _), y = -1, n = 0; n < p.length; n++) {
            s = l.indexOf(p[n]);
            if (-1 !== s && (y === -1 || y > s)) {
                y = s
            };
        }
        if (y === -1) {
            y = l.length
        };
        if (l[y - 1] === ":") {
            y--
        };
        var k = l.slice(0, y);
        l = l.slice(y);
        this.parseHost(k);
        this.hostname = this.hostname || "";
        var x = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!x) {
            var C = this.hostname.split(/\./);
            for (n = 0, r = C.length; r > n; n++) {
                var E = C[n];
                if (E && !E.match(f)) {
                    for (var T = "", S = 0, D = E.length; D > S; S++) {
                        T += E.charCodeAt(S) > 127 ? "x" : E[S];
                    }
                    if (!T.match(f)) {
                        var A = C.slice(0, n), M = C.slice(n + 1), F = E.match(m);
                        if (F) {
                            A.push(F[1]), M.unshift(F[2])
                        };
                        if (M.length) {
                            l = M.join(".") + l
                        };
                        this.hostname = A.join(".");
                        break;
                    }
                }
            }
        }
        if (this.hostname.length > h) {
            this.hostname = ""
        };
        if (x) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2)
        };
    }
    var N = l.indexOf("#");
    if (-1 !== N) {
        this.hash = l.substr(N), l = l.slice(0, N)
    };
    var O = l.indexOf("?");
    if (-1 !== O) {
        this.search = l.substr(O), l = l.slice(0, O)
    };
    if (l) {
        this.pathname = l
    };
    if (v[o] && this.hostname && !this.pathname) {
        this.pathname = ""
    };
    return this;
};

r.prototype.parseHost = function(e) {
    var t = s.exec(e);
    if (t) {
        t = t[0], ":" !== t && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)
    };
    if (e) {
        this.hostname = e
    };
};

module.exports = o;
