function r(e) {
    var t = e && e.forceBase64;
    if (!l || t) {
        this.supportsBinary = !1
    };
    o.call(this, e);
}

var o = require("../transport"), i = require("parseqs"), s = require("engine.io-parser"), a = require("component-inherit"), u = require("debug")("engine.io-client:polling");

module.exports = r;

var l = function() {
    var t = require("xmlhttprequest"), n = new t({
        xdomain: !1
    });
    return n.responseType != null;
}();

a(r, o);

r.prototype.name = "polling";

r.prototype.doOpen = function() {
    this.poll();
};

r.prototype.pause = function(e) {
    function t() {
        u("paused");
        n.readyState = "paused";
        e();
    }
    var n = this;
    this.readyState = "pausing";
    if (this.polling || !this.writable) {
        var r = 0;
        if (this.polling) {
            u("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function() {
                u("pre-pause polling complete");
                --r || t();
            })
        };
        this.writable || (u("we are currently writing - waiting to pause"), r++, this.once("drain", function() {
            u("pre-pause writing complete");
            --r || t();
        }));
    } else t();
};

r.prototype.poll = function() {
    u("polling");
    this.polling = !0;
    this.doPoll();
    this.emit("poll");
};

r.prototype.onData = function(e) {
    var t = this;
    u("polling got data %s", e);
    var n = function(e, n, r) {
        if (t.readyState == "opening") {
            t.onOpen()
        };
        if (e.type == "close") {
            t.onClose();
            return !1;
        }
        return void t.onPacket(e);
    };
    s.decodePayload(e, this.socket.binaryType, n);
    if (this.readyState != "closed") {
        this.polling = !1, this.emit("pollComplete"), this.readyState == "open" ? this.poll() : u('ignoring poll - transport state "%s"', this.readyState)
    };
};

r.prototype.doClose = function() {
    function e() {
        u("writing close packet");
        t.write([ {
            type: "close"
        } ]);
    }
    var t = this;
    if (this.readyState == "open") {
        u("transport open - closing");
        e();
    } else {
        u("transport not open - deferring close");
        this.once("open", e);
    }
};

r.prototype.write = function(e) {
    var t = this;
    this.writable = !1;
    var n = function() {
        t.writable = !0;
        t.emit("drain");
    }, t = this;
    s.encodePayload(e, this.supportsBinary, function(e) {
        t.doWrite(e, n);
    });
};

r.prototype.uri = function() {
    var e = this.query || {}, t = this.secure ? "https" : "http", n = "";
    if (!1 !== this.timestampRequests) {
        e[this.timestampParam] = +new Date() + "-" + o.timestamps++
    };
    this.supportsBinary || e.sid || (e.b64 = 1);
    e = i.encode(e);
    if (this.port && (t == "https" && this.port != 443 || t == "http" && this.port != 80)) {
        n = ":" + this.port
    };
    if (e.length) {
        e = "?" + e
    };
    return t + "://" + this.hostname + n + this.path + e;
};
