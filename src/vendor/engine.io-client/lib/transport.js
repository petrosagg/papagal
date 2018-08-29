function r(e) {
    this.path = e.path;
    this.hostname = e.hostname;
    this.port = e.port;
    this.secure = e.secure;
    this.query = e.query;
    this.timestampParam = e.timestampParam;
    this.timestampRequests = e.timestampRequests;
    this.readyState = "";
    this.agent = e.agent || false;
    this.socket = e.socket;
    this.enablesXDR = e.enablesXDR;
    this.pfx = e.pfx;
    this.key = e.key;
    this.passphrase = e.passphrase;
    this.cert = e.cert;
    this.ca = e.ca;
    this.ciphers = e.ciphers;
    this.rejectUnauthorized = e.rejectUnauthorized;
}

var o = require("engine.io-parser"), i = require("component-emitter");

module.exports = r;

i(r.prototype);

r.timestamps = 0;

r.prototype.onError = function(e, t) {
    var n = new Error(e);
    n.type = "TransportError";
    n.description = t;
    this.emit("error", n);
    return this;
};

r.prototype.open = function() {
    if (this.readyState == "closed" || this.readyState == "") {
        this.readyState = "opening", this.doOpen()
    };
    return this;
};

r.prototype.close = function() {
    if (this.readyState == "opening" || this.readyState == "open") {
        this.doClose(), this.onClose()
    };
    return this;
};

r.prototype.send = function(e) {
    if (this.readyState != "open") {
        throw new Error("Transport not open");
    }
    this.write(e);
};

r.prototype.onOpen = function() {
    this.readyState = "open";
    this.writable = true;
    this.emit("open");
};

r.prototype.onData = function(e) {
    var t = o.decodePacket(e, this.socket.binaryType);
    this.onPacket(t);
};

r.prototype.onPacket = function(e) {
    this.emit("packet", e);
};

r.prototype.onClose = function() {
    this.readyState = "closed";
    this.emit("close");
};
