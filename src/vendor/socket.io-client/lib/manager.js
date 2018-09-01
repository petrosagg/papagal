function r(e, t) {
    if (this instanceof r) {
        if (e && typeof e == "object") {
            t = e, e = undefined
        };
        t = t || {};
        t.path = t.path || "/socket.io";
        this.nsps = {};
        this.subs = [];
        this.opts = t;
        this.reconnection(t.reconnection !== false);
        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0);
        this.reconnectionDelay(t.reconnectionDelay || 1e3);
        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3);
        this.randomizationFactor(t.randomizationFactor || .5);
        this.backoff = new d({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        });
        this.timeout(t.timeout == null ? 2e4 : t.timeout);
        this.readyState = "closed";
        this.uri = e;
        this.connected = [];
        this.encoding = false;
        this.packetBuffer = [];
        this.encoder = new a.Encoder();
        this.decoder = new a.Decoder();
        this.autoConnect = t.autoConnect !== false;
        return void (this.autoConnect && this.open());
    }
    return new r(e, t);
}

var o = (require("./url"), require("engine.io-client")), i = require("./socket"), s = require("component-emitter"), a = require("socket.io-parser"), u = require("./on"), l = require("component-bind"), c = (require("object-component"), 
require("debug")("socket.io-client:manager")), p = require("indexof"), d = require("backo2");

module.exports = r;

r.prototype.emitAll = function() {
    this.emit.apply(this, arguments);
    for (var e in this.nsps) {
        this.nsps[e].emit.apply(this.nsps[e], arguments);
    }
};

r.prototype.updateSocketIds = function() {
    for (var e in this.nsps) {
        this.nsps[e].id = this.engine.id;
    }
};

s(r.prototype);

r.prototype.reconnection = function(e) {
    if (arguments.length) {
        this._reconnection = !!e;
        return this;
    }
    return this._reconnection;
};

r.prototype.reconnectionAttempts = function(e) {
    if (arguments.length) {
        this._reconnectionAttempts = e;
        return this;
    }
    return this._reconnectionAttempts;
};

r.prototype.reconnectionDelay = function(e) {
    if (arguments.length) {
        this._reconnectionDelay = e;
        if (this.backoff) {
            this.backoff.setMin(e)
        };
        return this;
    }
    return this._reconnectionDelay;
};

r.prototype.randomizationFactor = function(e) {
    if (arguments.length) {
        this._randomizationFactor = e;
        if (this.backoff) {
            this.backoff.setJitter(e)
        };
        return this;
    }
    return this._randomizationFactor;
};

r.prototype.reconnectionDelayMax = function(e) {
    if (arguments.length) {
        this._reconnectionDelayMax = e;
        if (this.backoff) {
            this.backoff.setMax(e)
        };
        return this;
    }
    return this._reconnectionDelayMax;
};

r.prototype.timeout = function(e) {
    if (arguments.length) {
        this._timeout = e;
        return this;
    }
    return this._timeout;
};

r.prototype.maybeReconnectOnOpen = function() {
    if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect()
    };
};

r.prototype.open = r.prototype.connect = function(e) {
    c("readyState %s", this.readyState);
    if (~this.readyState.indexOf("open")) {
        return this;
    }
    c("opening %s", this.uri);
    this.engine = o(this.uri, this.opts);
    var t = this.engine, n = this;
    this.readyState = "opening";
    this.skipReconnect = false;
    var r = u(t, "open", function() {
        n.onopen();
        if (e) {
            e()
        };
    }), i = u(t, "error", function(t) {
        c("connect_error");
        n.cleanup();
        n.readyState = "closed";
        n.emitAll("connect_error", t);
        if (e) {
            var r = new Error("Connection error");
            r.data = t;
            e(r);
        } else {
            n.maybeReconnectOnOpen();
        }
    });
    if (this._timeout !== false) {
        var s = this._timeout;
        c("connect attempt will timeout after %d", s);
        var a = setTimeout(function() {
            c("connect attempt timed out after %d", s);
            r.destroy();
            t.close();
            t.emit("error", "timeout");
            n.emitAll("connect_timeout", s);
        }, s);
        this.subs.push({
            destroy: function() {
                clearTimeout(a);
            }
        });
    }
    this.subs.push(r);
    this.subs.push(i);
    return this;
};

r.prototype.onopen = function() {
    c("open");
    this.cleanup();
    this.readyState = "open";
    this.emit("open");
    var e = this.engine;
    this.subs.push(u(e, "data", l(this, "ondata")));
    this.subs.push(u(this.decoder, "decoded", l(this, "ondecoded")));
    this.subs.push(u(e, "error", l(this, "onerror")));
    this.subs.push(u(e, "close", l(this, "onclose")));
};

r.prototype.ondata = function(e) {
    this.decoder.add(e);
};

r.prototype.ondecoded = function(e) {
    this.emit("packet", e);
};

r.prototype.onerror = function(e) {
    c("error", e);
    this.emitAll("error", e);
};

r.prototype.socket = function(e) {
    var t = this.nsps[e];
    if (!t) {
        t = new i(this, e);
        this.nsps[e] = t;
        var n = this;
        t.on("connect", function() {
            t.id = n.engine.id;
            ~p(n.connected, t) || n.connected.push(t);
        });
    }
    return t;
};

r.prototype.destroy = function(e) {
    var t = p(this.connected, e);
    if (~t) {
        this.connected.splice(t, 1)
    };
    this.connected.length || this.close();
};

r.prototype.packet = function(e) {
    c("writing packet %j", e);
    var t = this;
    if (t.encoding) {
        t.packetBuffer.push(e);
    } else {
        t.encoding = true;
        this.encoder.encode(e, function(e) {
            for (var n = 0; n < e.length; n++) {
                t.engine.write(e[n]);
            }
            t.encoding = false;
            t.processPacketQueue();
        });
    }
};

r.prototype.processPacketQueue = function() {
    if (this.packetBuffer.length > 0 && !this.encoding) {
        var e = this.packetBuffer.shift();
        this.packet(e);
    }
};

r.prototype.cleanup = function() {
    for (var e; e = this.subs.shift(); ) {
        e.destroy();
    }
    this.packetBuffer = [];
    this.encoding = false;
    this.decoder.destroy();
};

r.prototype.close = r.prototype.disconnect = function() {
    this.skipReconnect = true;
    this.backoff.reset();
    this.readyState = "closed";
    if (this.engine) {
        this.engine.close()
    };
};

r.prototype.onclose = function(e) {
    c("close");
    this.cleanup();
    this.backoff.reset();
    this.readyState = "closed";
    this.emit("close", e);
    if (this._reconnection && !this.skipReconnect) {
        this.reconnect()
    };
};

r.prototype.reconnect = function() {
    if (this.reconnecting || this.skipReconnect) {
        return this;
    }
    var e = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
        c("reconnect failed");
        this.backoff.reset();
        this.emitAll("reconnect_failed");
        this.reconnecting = false;
    } else {
        var t = this.backoff.duration();
        c("will wait %dms before reconnect attempt", t);
        this.reconnecting = true;
        var n = setTimeout(function() {
            e.skipReconnect || (c("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), 
            e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function(t) {
                if (t) {
                    c("reconnect attempt error");
                    e.reconnecting = false;
                    e.reconnect();
                    e.emitAll("reconnect_error", t.data);
                } else {
                    c("reconnect success");
                    e.onreconnect();
                }
            }));
        }, t);
        this.subs.push({
            destroy: function() {
                clearTimeout(n);
            }
        });
    }
};

r.prototype.onreconnect = function() {
    var e = this.backoff.attempts;
    this.reconnecting = false;
    this.backoff.reset();
    this.updateSocketIds();
    this.emitAll("reconnect", e);
};
