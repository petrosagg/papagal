(function(e) {
    function n(e) {
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            if (n.buffer instanceof ArrayBuffer) {
                var r = n.buffer;
                if (n.byteLength !== r.byteLength) {
                    var o = new Uint8Array(n.byteLength);
                    o.set(new Uint8Array(r, n.byteOffset, n.byteLength));
                    r = o.buffer;
                }
                e[t] = r;
            }
        }
    }
    function r(e, t) {
        t = t || {};
        var r = new i();
        n(e);
        for (var o = 0; o < e.length; o++) {
            r.append(e[o]);
        }
        if (t.type) {
            return r.getBlob(t.type);
        }
        return r.getBlob();
    }
    function o(e, t) {
        n(e);
        return new Blob(e, t || {});
    }
    var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder, s = function() {
        try {
            var e = new Blob([ "hi" ]);
            return e.size === 2;
        } catch (t) {
            return !1;
        }
    }(), a = s && function() {
        try {
            var e = new Blob([ new Uint8Array([ 1, 2 ]) ]);
            return e.size === 2;
        } catch (t) {
            return !1;
        }
    }(), u = i && i.prototype.append && i.prototype.getBlob;
    module.exports = function() {
        if (s) {
            if (a) {
                return e.Blob;
            }
            return o;
        }
        if (u) {
            return r;
        }
        return;
    }();
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});