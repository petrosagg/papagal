(function(t) {
    var r = require("isarray"), o = require("./is-buffer");
    exports.deconstructPacket = function(e) {
        function t(e) {
            if (!e) {
                return e;
            }
            if (o(e)) {
                var i = {
                    _placeholder: !0,
                    num: n.length
                };
                n.push(e);
                return i;
            }
            if (r(e)) {
                for (var s = new Array(e.length), a = 0; a < e.length; a++) {
                    s[a] = t(e[a]);
                }
                return s;
            }
            if (typeof e == "object" && !(e instanceof Date)) {
                var s = {};
                for (var u in e) {
                    s[u] = t(e[u]);
                }
                return s;
            }
            return e;
        }
        var n = [], i = e.data, s = e;
        s.data = t(i);
        s.attachments = n.length;
        return {
            packet: s,
            buffers: n
        };
    };
    exports.reconstructPacket = function(e, t) {
        function n(e) {
            if (e && e._placeholder) {
                var o = t[e.num];
                return o;
            }
            if (r(e)) {
                for (var i = 0; i < e.length; i++) {
                    e[i] = n(e[i]);
                }
                return e;
            }
            if (e && typeof e == "object") {
                for (var s in e) {
                    e[s] = n(e[s]);
                }
                return e;
            }
            return e;
        }
        e.data = n(e.data);
        e.attachments = void 0;
        return e;
    };
    exports.removeBlobs = function(e, n) {
        function i(e, u, l) {
            if (!e) {
                return e;
            }
            if (t.Blob && e instanceof Blob || t.File && e instanceof File) {
                s++;
                var c = new FileReader();
                c.onload = function() {
                    l ? l[u] = this.result : a = this.result;
                    --s || n(a);
                };
                c.readAsArrayBuffer(e);
            } else if (r(e)) {
                for (var p = 0; p < e.length; p++) {
                    i(e[p], p, e);
                }
            } else if (e && typeof e == "object" && !o(e)) {
                for (var d in e) {
                    i(e[d], d, e);
                }
            }
        }
        var s = 0, a = e;
        i(a);
        s || n(a);
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
