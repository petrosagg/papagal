(function(n) {
    function r(e) {
        function t(e) {
            if (!e) {
                return !1;
            }
            if (n.Buffer && n.Buffer.isBuffer(e) || n.ArrayBuffer && e instanceof ArrayBuffer || n.Blob && e instanceof Blob || n.File && e instanceof File) {
                return !0;
            }
            if (o(e)) {
                for (var r = 0; r < e.length; r++) {
                    if (t(e[r])) {
                        return !0;
                    }
                }
            } else if (e && typeof e == "object") {
                if (e.toJSON) {
                    e = e.toJSON()
                };
                for (var i in e) {
                    if (Object.prototype.hasOwnProperty.call(e, i) && t(e[i])) {
                        return !0;
                    }
                }
            }
            return !1;
        }
        return t(e);
    }
    var o = require("isarray");
    module.exports = r;
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});