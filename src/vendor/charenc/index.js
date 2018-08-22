var r = {
    utf8: {
        stringToBytes: function(e) {
            return r.bin.stringToBytes(unescape(encodeURIComponent(e)));
        },
        bytesToString: function(e) {
            return decodeURIComponent(escape(r.bin.bytesToString(e)));
        }
    },
    bin: {
        stringToBytes: function(e) {
            for (var t = [], n = 0; n < e.length; n++) {
                t.push(255 & e.charCodeAt(n));
            }
            return t;
        },
        bytesToString: function(e) {
            for (var t = [], n = 0; n < e.length; n++) {
                t.push(String.fromCharCode(e[n]));
            }
            return t.join("");
        }
    }
};

module.exports = r;
