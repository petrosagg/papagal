"use strict";

function r(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    t.forEach(function(t) {
        if (t) {
            Object.keys(t).forEach(function(n) {
                e[n] = t[n];
            })
        };
    });
    return e;
}

function o(e) {
    return Object.prototype.toString.call(e);
}

function i(e) {
    return o(e) === "[object String]";
}

function s(e) {
    return o(e) === "[object Object]";
}

function a(e) {
    return o(e) === "[object RegExp]";
}

function u(e) {
    return o(e) === "[object Function]";
}

function l(e) {
    return e.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}

function c(e) {
    return Object.keys(e || {}).reduce(function(e, t) {
        return e || b.hasOwnProperty(t);
    }, false);
}

function p(e) {
    e.__index__ = -1;
    e.__text_cache__ = "";
}

function d(e) {
    return function(t, n) {
        var r = t.slice(n);
        if (e.test(r)) {
            return r.match(e)[0].length;
        }
        return 0;
    };
}

function h() {
    return function(e, t) {
        t.normalize(e);
    };
}

function f(t) {
    function n(e) {
        return e.replace("%TLDS%", c.src_tlds);
    }
    function o(e, t) {
        throw new Error('(LinkifyIt) Invalid schema "' + e + '": ' + t);
    }
    var c = t.re = r({}, require("./lib/re")), f = t.__tlds__.slice();
    if (!t.__tlds_replaced__) {
        f.push(_)
    };
    f.push(c.src_xn);
    c.src_tlds = f.join("|");
    c.email_fuzzy = RegExp(n(c.tpl_email_fuzzy), "i");
    c.link_fuzzy = RegExp(n(c.tpl_link_fuzzy), "i");
    c.link_no_ip_fuzzy = RegExp(n(c.tpl_link_no_ip_fuzzy), "i");
    c.host_fuzzy_test = RegExp(n(c.tpl_host_fuzzy_test), "i");
    var m = [];
    t.__compiled__ = {};
    Object.keys(t.__schemas__).forEach(function(e) {
        var n = t.__schemas__[e];
        if (n !== null) {
            var r = {
                validate: null,
                link: null
            };
            t.__compiled__[e] = r;
            if (s(n)) {
                if (a(n.validate)) {
                    r.validate = d(n.validate);
                } else {
                    if (u(n.validate)) {
                        r.validate = n.validate;
                    } else {
                        o(e, n);
                    }
                }
                return void (u(n.normalize) ? r.normalize = n.normalize : n.normalize ? o(e, n) : r.normalize = h());
            }
            if (i(n)) {
                return void m.push(e);
            }
            return void o(e, n);
        }
    });
    m.forEach(function(e) {
        if (t.__compiled__[t.__schemas__[e]]) {
            t.__compiled__[e].validate = t.__compiled__[t.__schemas__[e]].validate;
            t.__compiled__[e].normalize = t.__compiled__[t.__schemas__[e]].normalize;
        };
    });
    t.__compiled__[""] = {
        validate: null,
        normalize: h()
    };
    var g = Object.keys(t.__compiled__).filter(function(e) {
        return e.length > 0 && t.__compiled__[e];
    }).map(l).join("|");
    t.re.schema_test = RegExp("(^|(?!_)(?:>|" + c.src_ZPCc + "))(" + g + ")", "i");
    t.re.schema_search = RegExp("(^|(?!_)(?:>|" + c.src_ZPCc + "))(" + g + ")", "ig");
    t.re.pretest = RegExp("(" + t.re.schema_test.source + ")|(" + t.re.host_fuzzy_test.source + ")|@", "i");
    p(t);
}

function m(e, t) {
    var n = e.__index__, r = e.__last_index__, o = e.__text_cache__.slice(n, r);
    this.schema = e.__schema__.toLowerCase();
    this.index = n + t;
    this.lastIndex = r + t;
    this.raw = o;
    this.text = o;
    this.url = o;
}

function g(e, t) {
    var n = new m(e, t);
    e.__compiled__[n.schema].normalize(n, e);
    return n;
}

function v(e, t) {
    if (this instanceof v) {
        if (!t) {
            if (c(e)) {
                t = e;
                e = {};
            }
        };
        this.__opts__ = r({}, b, t);
        this.__index__ = -1;
        this.__last_index__ = -1;
        this.__schema__ = "";
        this.__text_cache__ = "";
        this.__schemas__ = r({}, y, e);
        this.__compiled__ = {};
        this.__tlds__ = w;
        this.__tlds_replaced__ = false;
        this.re = {};
        return void f(this);
    }
    return new v(e, t);
}

var b = {
    fuzzyLink: true,
    fuzzyEmail: true,
    fuzzyIP: false
}, y = {
    "http:": {
        validate: function(e, t, n) {
            var r = e.slice(t);
            if (!n.re.http) {
                n.re.http = new RegExp("^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path, "i")
            };
            if (n.re.http.test(r)) {
                return r.match(n.re.http)[0].length;
            }
            return 0;
        }
    },
    "https:": "http:",
    "ftp:": "http:",
    "//": {
        validate: function(e, t, n) {
            var r = e.slice(t);
            if (!n.re.no_http) {
                n.re.no_http = new RegExp("^" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path, "i")
            };
            if (n.re.no_http.test(r)) {
                if (t >= 3 && e[t - 3] === ":") {
                    return 0;
                }
                return r.match(n.re.no_http)[0].length;
            }
            return 0;
        }
    },
    "mailto:": {
        validate: function(e, t, n) {
            var r = e.slice(t);
            if (!n.re.mailto) {
                n.re.mailto = new RegExp("^" + n.re.src_email_name + "@" + n.re.src_host_strict, "i")
            };
            if (n.re.mailto.test(r)) {
                return r.match(n.re.mailto)[0].length;
            }
            return 0;
        }
    }
}, _ = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", w = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");

v.prototype.add = function(e, t) {
    this.__schemas__[e] = t;
    f(this);
    return this;
};

v.prototype.set = function(e) {
    this.__opts__ = r(this.__opts__, e);
    return this;
};

v.prototype.test = function(e) {
    this.__text_cache__ = e;
    this.__index__ = -1;
    if (!e.length) {
        return false;
    }
    var t, n, r, o, i, s, a, u, l;
    if (this.re.schema_test.test(e)) {
        for (a = this.re.schema_search, a.lastIndex = 0; (t = a.exec(e)) !== null; ) {
            o = this.testSchemaAt(e, t[2], a.lastIndex);
            if (o) {
                this.__schema__ = t[2];
                this.__index__ = t.index + t[1].length;
                this.__last_index__ = t.index + t[0].length + o;
                break;
            }
        }
    }
    if (this.__opts__.fuzzyLink && this.__compiled__["http:"]) {
        u = e.search(this.re.host_fuzzy_test);
        if (u >= 0 && (this.__index__ < 0 || u < this.__index__) && (n = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {
            i = n.index + n[1].length;
            if (this.__index__ < 0 || i < this.__index__) {
                this.__schema__ = "";
                this.__index__ = i;
                this.__last_index__ = n.index + n[0].length;
            };
        };
    };
    if (this.__opts__.fuzzyEmail && this.__compiled__["mailto:"]) {
        l = e.indexOf("@");
        if (l >= 0 && (r = e.match(this.re.email_fuzzy)) !== null) {
            i = r.index + r[1].length;
            s = r.index + r[0].length;
            if (this.__index__ < 0 || i < this.__index__ || i === this.__index__ && s > this.__last_index__) {
                this.__schema__ = "mailto:";
                this.__index__ = i;
                this.__last_index__ = s;
            };
        };
    };
    return this.__index__ >= 0;
};

v.prototype.pretest = function(e) {
    return this.re.pretest.test(e);
};

v.prototype.testSchemaAt = function(e, t, n) {
    if (this.__compiled__[t.toLowerCase()]) {
        return this.__compiled__[t.toLowerCase()].validate(e, n, this);
    }
    return 0;
};

v.prototype.match = function(e) {
    var t = 0, n = [];
    if (this.__index__ >= 0 && this.__text_cache__ === e) {
        n.push(g(this, t));
        t = this.__last_index__;
    };
    for (var r = t ? e.slice(t) : e; this.test(r); ) {
        n.push(g(this, t));
        r = r.slice(this.__last_index__);
        t += this.__last_index__;
    }
    if (n.length) {
        return n;
    }
    return null;
};

v.prototype.tlds = function(e, t) {
    if (Array.isArray(e)) {
        e = e;
    } else {
        e = [ e ];
    }
    if (t) {
        this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(e, t, n) {
            return e !== n[t - 1];
        }).reverse();
        f(this);
        return this;
    }
    this.__tlds__ = e.slice();
    this.__tlds_replaced__ = true;
    f(this);
    return this;
};

v.prototype.normalize = function(e) {
    if (!e.schema) {
        e.url = "http://" + e.url
    };
    if (!(e.schema !== "mailto:" || /^mailto:/i.test(e.url))) {
        e.url = "mailto:" + e.url
    };
};

module.exports = v;
