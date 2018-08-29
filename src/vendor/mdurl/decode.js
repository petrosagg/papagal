"use strict";

function r(e) {
    var t, n, r = i[e];
    if (r) {
        return r;
    }
    for (r = i[e] = [], t = 0; t < 128; t++) {
        n = String.fromCharCode(t);
        r.push(n);
    }
    for (t = 0; t < e.length; t++) {
        n = e.charCodeAt(t);
        r[n] = "%" + ("0" + n.toString(16).toUpperCase()).slice(-2);
    }
    return r;
}

function o(e, t) {
    var n;
    if (typeof t != "string") {
        t = o.defaultChars
    };
    n = r(t);
    return e.replace(/(%[a-f0-9]{2})+/gi, function(e) {
        var t, r, o, i, s, a, u, l = "";
        for (t = 0, r = e.length; r > t; t += 3) {
            o = parseInt(e.slice(t + 1, t + 3), 16);
            if (o < 128) {
                l += n[o];
            } else {
                if ((224 & o) === 192 && r > t + 3 && (i = parseInt(e.slice(t + 4, t + 6), 16), 
                (192 & i) === 128)) {
                    u = o << 6 & 1984 | 63 & i;
                    if (u < 128) {
                        l += "��";
                    } else {
                        l += String.fromCharCode(u);
                    }
                    t += 3;
                } else {
                    if ((240 & o) === 224 && r > t + 6 && (i = parseInt(e.slice(t + 4, t + 6), 16), 
                    s = parseInt(e.slice(t + 7, t + 9), 16), (192 & i) === 128 && (192 & s) === 128)) {
                        u = o << 12 & 61440 | i << 6 & 4032 | 63 & s;
                        if (u < 2048 || u >= 55296 && u <= 57343) {
                            l += "���";
                        } else {
                            l += String.fromCharCode(u);
                        }
                        t += 6;
                    } else {
                        if ((248 & o) === 240 && r > t + 9 && (i = parseInt(e.slice(t + 4, t + 6), 16), 
                        s = parseInt(e.slice(t + 7, t + 9), 16), a = parseInt(e.slice(t + 10, t + 12), 16), 
                        (192 & i) === 128 && (192 & s) === 128 && (192 & a) === 128)) {
                            u = o << 18 & 1835008 | i << 12 & 258048 | s << 6 & 4032 | 63 & a;
                            if (u < 65536 || u > 1114111) {
                                l += "����";
                            } else {
                                u -= 65536;
                                l += String.fromCharCode(55296 + (u >> 10), 56320 + (1023 & u));
                            }
                            t += 9;
                        } else {
                            l += "�";
                        }
                    }
                }
            }
        }
        return l;
    });
}

var i = {};

o.defaultChars = ";/?:@&=+$,#";

o.componentChars = "";

module.exports = o;
