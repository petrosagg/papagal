function r(e) {
    var t = e && e.forceBase64;
    if (t) {
        this.supportsBinary = false
    };
    o.call(this, e);
}

var o = require("../transport"), i = require("engine.io-parser"), s = require("parseqs"), a = require("component-inherit"), u = require("debug")("engine.io-client:websocket"), l = require("ws");

module.exports = r;

a(r, o);

r.prototype.name = "websocket";

r.prototype.supportsBinary = true;

r.prototype.doOpen = function() {
    if (this.check()) {
        var e = this.uri(), t = undefined, n = {
            agent: this.agent
        };
        n.pfx = this.pfx;
        n.key = this.key;
        n.passphrase = this.passphrase;
        n.cert = this.cert;
        n.ca = this.ca;
        n.ciphers = this.ciphers;
        n.rejectUnauthorized = this.rejectUnauthorized;
        this.ws = new l(e, t, n);
        if (this.ws.binaryType === undefined) {
            this.supportsBinary = false
        };
        this.ws.binaryType = "arraybuffer";
        this.addEventListeners();
    }
};

r.prototype.addEventListeners = function() {
    var e = this;
    this.ws.onopen = function() {
        e.onOpen();
    };
    this.ws.onclose = function() {
        e.onClose();
    };
    this.ws.onmessage = function(t) {
        e.onData(t.data);
    };
    this.ws.onerror = function(t) {
        e.onError("websocket error", t);
    };
};

if (typeof navigator != "undefined" && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
    r.prototype.onData = function(e) {
        var t = this;
        setTimeout(function() {
            o.prototype.onData.call(t, e);
        }, 0);
    }
};

r.prototype.write = function(e) {
    function t() {
        n.writable = true;
        n.emit("drain");
    }
    var n = this;
    this.writable = false;
    for (var r = 0, o = e.length; o > r; r++) {
        i.encodePacket(e[r], this.supportsBinary, function(e) {
            try {
                n.ws.send(e);
            } catch (t) {
                u("websocket closed before onclose event");
            }
        });
    }
    setTimeout(t, 0);
};

r.prototype.onClose = function() {
    o.prototype.onClose.call(this);
};

r.prototype.doClose = function() {
    if (typeof this.ws != "undefined") {
        this.ws.close()
    };
};

r.prototype.uri = function() {
    var e = this.query || {}, t = this.secure ? "wss" : "ws", n = "";
    if (this.port && (t == "wss" && this.port != 443 || t == "ws" && this.port != 80)) {
        n = ":" + this.port
    };
    if (this.timestampRequests) {
        e[this.timestampParam] = +new Date()
    };
    if (!this.supportsBinary) {
        e.b64 = 1
    };
    e = s.encode(e);
    if (e.length) {
        e = "?" + e
    };
    return t + "://" + this.hostname + n + this.path + e;
};

r.prototype.check = function() {
    return !(!l || "__initialize" in l && this.name === r.prototype.name);
};
