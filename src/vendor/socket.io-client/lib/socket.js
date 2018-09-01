function r(e, t) {
    this.io = e;
    this.nsp = t;
    this.json = this;
    this.ids = 0;
    this.acks = {};
    if (this.io.autoConnect) {
        this.open()
    };
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.connected = false;
    this.disconnected = true;
}

var o = require("socket.io-parser"), i = require("component-emitter"), s = require("to-array"), a = require("./on"), u = require("component-bind"), l = require("debug")("socket.io-client:socket"), c = require("has-binary");

module.exports = exports = r;

var p = {
    connect: 1,
    connect_error: 1,
    connect_timeout: 1,
    disconnect: 1,
    error: 1,
    reconnect: 1,
    reconnect_attempt: 1,
    reconnect_failed: 1,
    reconnect_error: 1,
    reconnecting: 1
}, d = i.prototype.emit;

i(r.prototype);

r.prototype.subEvents = function() {
    if (!this.subs) {
        var e = this.io;
        this.subs = [ a(e, "open", u(this, "onopen")), a(e, "packet", u(this, "onpacket")), a(e, "close", u(this, "onclose")) ];
    }
};

r.prototype.open = r.prototype.connect = function() {
    if (this.connected) {
        return this;
    }
    this.subEvents();
    this.io.open();
    if (this.io.readyState == "open") {
        this.onopen()
    };
    return this;
};

r.prototype.send = function() {
    var e = s(arguments);
    e.unshift("message");
    this.emit.apply(this, e);
    return this;
};

r.prototype.emit = function(e) {
    if (p.hasOwnProperty(e)) {
        d.apply(this, arguments);
        return this;
    }
    var t = s(arguments), n = o.EVENT;
    if (c(t)) {
        n = o.BINARY_EVENT
    };
    var r = {
        type: n,
        data: t
    };
    if (typeof t[t.length - 1] == "function") {
        l("emitting packet with ack id %d", this.ids);
        this.acks[this.ids] = t.pop();
        r.id = this.ids++;
    };
    if (this.connected) {
        this.packet(r);
    } else {
        this.sendBuffer.push(r);
    }
    return this;
};

r.prototype.packet = function(e) {
    e.nsp = this.nsp;
    this.io.packet(e);
};

r.prototype.onopen = function() {
    l("transport is open - connecting");
    if (this.nsp != "/") {
        this.packet({
            type: o.CONNECT
        })
    };
};

r.prototype.onclose = function(e) {
    l("close (%s)", e);
    this.connected = false;
    this.disconnected = true;
    delete this.id;
    this.emit("disconnect", e);
};

r.prototype.onpacket = function(e) {
    if (e.nsp == this.nsp) {
        switch (e.type) {
          case o.CONNECT:
            this.onconnect();
            break;

          case o.EVENT:
            this.onevent(e);
            break;

          case o.BINARY_EVENT:
            this.onevent(e);
            break;

          case o.ACK:
            this.onack(e);
            break;

          case o.BINARY_ACK:
            this.onack(e);
            break;

          case o.DISCONNECT:
            this.ondisconnect();
            break;

          case o.ERROR:
            this.emit("error", e.data);
        }
    }
};

r.prototype.onevent = function(e) {
    var t = e.data || [];
    l("emitting event %j", t);
    if (e.id != null) {
        l("attaching ack callback to event");
        t.push(this.ack(e.id));
    };
    if (this.connected) {
        d.apply(this, t);
    } else {
        this.receiveBuffer.push(t);
    }
};

r.prototype.ack = function(e) {
    var t = this, n = false;
    return function() {
        if (!n) {
            n = true;
            var r = s(arguments);
            l("sending ack %j", r);
            var i = c(r) ? o.BINARY_ACK : o.ACK;
            t.packet({
                type: i,
                id: e,
                data: r
            });
        }
    };
};

r.prototype.onack = function(e) {
    l("calling ack %s with %j", e.id, e.data);
    var t = this.acks[e.id];
    t.apply(this, e.data);
    delete this.acks[e.id];
};

r.prototype.onconnect = function() {
    this.connected = true;
    this.disconnected = false;
    this.emit("connect");
    this.emitBuffered();
};

r.prototype.emitBuffered = function() {
    var e;
    for (e = 0; e < this.receiveBuffer.length; e++) {
        d.apply(this, this.receiveBuffer[e]);
    }
    for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) {
        this.packet(this.sendBuffer[e]);
    }
    this.sendBuffer = [];
};

r.prototype.ondisconnect = function() {
    l("server disconnect (%s)", this.nsp);
    this.destroy();
    this.onclose("io server disconnect");
};

r.prototype.destroy = function() {
    if (this.subs) {
        for (var e = 0; e < this.subs.length; e++) {
            this.subs[e].destroy();
        }
        this.subs = null;
    }
    this.io.destroy(this);
};

r.prototype.close = r.prototype.disconnect = function() {
    if (this.connected) {
        l("performing disconnect (%s)", this.nsp);
        this.packet({
            type: o.DISCONNECT
        });
    };
    this.destroy();
    if (this.connected) {
        this.onclose("io client disconnect")
    };
    return this;
};
