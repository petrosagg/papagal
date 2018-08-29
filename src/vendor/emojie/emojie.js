!function(e, r) {
    if (typeof define == "function" && define.amd) {
        define([], r);
    } else {
        if (typeof exports == "object") {
            module.exports = r();
        } else {
            e.Emojie = r();
        }
    }
}(this, function() {
    function e(e, t, n) {
        if (e) {
            for (var r, o, i, s = [ e ]; s.length > 0; ) {
                i = s.pop();
                if (i.nodeType == 3) {
                    n(i);
                } else if (i.getAttribute(t.ignoreAttribute || "data-no-emojie") == null) {
                    for (r = i.childNodes.length, o = r - 1; o >= 0; --o) {
                        s.push(i.childNodes[o]);
                    }
                }
            }
        }
    }
    function t(e, t) {
        var n, r = document.createElement(t.elementName || "img");
        if (t.content) {
            r.textContent = t.content
        };
        for (n in t) {
            if (n != "content" && n != "elementName") {
                r.setAttribute(n, t[n])
            };
        }
        return r;
    }
    function n(e) {
        return function n(r) {
            var o, i, s = r.data, a = 0, u = "";
            for (a = 0; a < s.length; a++) {
                u += s[a];
                if (!(e[u] === true || e[u] && e[u + s[a + 1]])) {
                    if (e[u]) {
                        o = r.splitText(a - u.length + 1);
                        if (o.length > u.length) {
                            i = o.splitText(u.length)
                        };
                        r.parentNode.replaceChild(t(o, e[u]), o);
                        if (i) {
                            return n(i);
                        }
                        return;
                    }
                    u = "";
                }
            }
        };
    }
    function r(t) {
        function r(r) {
            var i = n(o);
            if (r.nodeType == 3) {
                i(r);
            } else {
                e(r, t || {}, i);
            }
            return r;
        }
        var o = {};
        r._emojis = o;
        r.register = function(e, t) {
            var n, i;
            for (n = 1; n < e.length; n++) {
                i = e.slice(0, n);
                i in o || (o[i] = true);
            }
            o[e] = t;
            return r;
        };
        r.merge = function(e) {
            function t(e, t) {
                if (e === true && t) {
                    return t;
                }
                if (e && t) {
                    return e;
                }
                return e || t;
            }
            var n;
            for (n in e._emojis) {
                if (e._emojis.hasOwnProperty(n)) {
                    o[n] = t(e._emojis[n], o[n])
                };
            }
            return r;
        };
        return r;
    }
    r.canRender = function(e) {
        function t(e, t) {
            var n, r = e.getImageData(0, 0, t, t).data;
            for (n = 0; n < r.length; n += 4) {
                if (r[n] != r[n + 1] && r[n] != r[n + 2]) {
                    return true;
                }
            }
            return false;
        }
        try {
            var n = document.createElement("canvas").getContext("2d");
            n.textBaseline = "top";
            n.fillText(e, 0, 0);
            return t(n, 10);
        } catch (r) {
            return !1;
        }
    };
    return r;
});
