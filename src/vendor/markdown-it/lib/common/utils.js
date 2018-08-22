"use strict";

function r(e) {
    return Object.prototype.toString.call(e);
}

function o(e) {
    return r(e) === "[object String]";
}

function i(e, t) {
    return _.call(e, t);
}

function s(e) {
    var t = Array.prototype.slice.call(arguments, 1);
    t.forEach(function(t) {
        if (t) {
            if (typeof t != "object") {
                throw new TypeError(t + "must be object");
            }
            Object.keys(t).forEach(function(n) {
                e[n] = t[n];
            });
        }
    });
    return e;
}

function a(e, t, n) {
    return [].concat(e.slice(0, t), n, e.slice(t + 1));
}

function u(e) {
    if (e >= 55296 && e <= 57343) {
        return !1;
    }
    if (e >= 64976 && e <= 65007) {
        return !1;
    }
    if ((65535 & e) === 65535 || (65535 & e) === 65534) {
        return !1;
    }
    if (e >= 0 && e <= 8) {
        return !1;
    }
    if (e === 11) {
        return !1;
    }
    if (e >= 14 && e <= 31) {
        return !1;
    }
    if (e >= 127 && e <= 159) {
        return !1;
    }
    if (e > 1114111) {
        return !1;
    }
    return !0;
}

function l(e) {
    if (e > 65535) {
        e -= 65536;
        var t = 55296 + (e >> 10), n = 56320 + (1023 & e);
        return String.fromCharCode(t, n);
    }
    return String.fromCharCode(e);
}

function c(e, t) {
    var n = 0;
    if (i(E, t)) {
        return E[t];
    }
    if (t.charCodeAt(0) === 35 && C.test(t) && (n = t[1].toLowerCase() === "x" ? parseInt(t.slice(2), 16) : parseInt(t.slice(1), 10), 
    u(n))) {
        return l(n);
    }
    return e;
}

function p(e) {
    if (e.indexOf("\\") < 0) {
        return e;
    }
    return e.replace(w, "$1");
}

function d(e) {
    if (e.indexOf("\\") < 0 && e.indexOf("&") < 0) {
        return e;
    }
    return e.replace(x, function(e, t, n) {
        if (t) {
            return t;
        }
        return c(e, n);
    });
}

function h(e) {
    return D[e];
}

function f(e) {
    if (T.test(e)) {
        return e.replace(S, h);
    }
    return e;
}

function m(e) {
    return e.replace(A, "\\$&");
}

function g(e) {
    if (e >= 8192 && e <= 8202) {
        return !0;
    }
    switch (e) {
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 32:
      case 160:
      case 5760:
      case 8239:
      case 8287:
      case 12288:
        return !0;
    }
    return !1;
}

function v(e) {
    return M.test(e);
}

function b(e) {
    switch (e) {
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 124:
      case 125:
      case 126:
        return !0;

      default:
        return !1;
    }
}

function y(e) {
    return e.trim().replace(/\s+/g, " ").toUpperCase();
}

var _ = Object.prototype.hasOwnProperty, w = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g, k = /&([a-z#][a-z0-9]{1,31});/gi, x = new RegExp(w.source + "|" + k.source, "gi"), C = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i, E = require("./entities"), T = /[&<>"]/, S = /[&<>"]/g, D = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
}, A = /[.?*+^$[\]\\(){}|-]/g, M = require("uc.micro/categories/P/regex");

global.lib = {};

global.lib.mdurl = require("mdurl");

global.lib.ucmicro = require("uc.micro");

global.assign = s;

global.isString = o;

global.has = i;

global.unescapeMd = p;

global.unescapeAll = d;

global.isValidEntityCode = u;

global.fromCodePoint = l;

global.escapeHtml = f;

global.arrayReplaceAt = a;

global.isWhiteSpace = g;

global.isMdAsciiPunct = b;

global.isPunctChar = v;

global.escapeRE = m;

global.normalizeReference = y;