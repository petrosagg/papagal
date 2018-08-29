(function(n) {
    function r(e, t) {
        if (!(this instanceof r)) {
            return new r(e, t);
        }
        t = t || {};
        if (e && typeof e == "object") {
            t = e, e = null
        };
        if (e) {
            e = c(e), t.host = e.host, t.secure = e.protocol == "https" || e.protocol == "wss", 
            t.port = e.port, e.query && (t.query = e.query)
        };
        if (t.secure != null) {
            this.secure = t.secure;
        } else {
            this.secure = n.location && location.protocol == "https:";
        }
        if (t.host) {
            var o = t.host.split(":");
            t.hostname = o.shift();
            if (o.length) {
                t.port = o.pop();
            } else {
                t.port || (t.port = this.secure ? "443" : "80");
            }
        }
        this.agent = t.agent || false;
        this.hostname = t.hostname || (n.location ? location.hostname : "localhost");
        this.port = t.port || (n.location && location.port ? location.port : this.secure ? 443 : 80);
        this.query = t.query || {};
        if (typeof this.query == "string") {
            this.query = d.decode(this.query)
        };
        this.upgrade = false !== t.upgrade;
        this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/";
        this.forceJSONP = !!t.forceJSONP;
        this.jsonp = false !== t.jsonp;
        this.forceBase64 = !!t.forceBase64;
        this.enablesXDR = !!t.enablesXDR;
        this.timestampParam = t.timestampParam || "t";
        this.timestampRequests = t.timestampRequests;
        this.transports = t.transports || [ "polling", "websocket" ];
        this.readyState = "";
        this.writeBuffer = [];
        this.callbackBuffer = [];
        this.policyPort = t.policyPort || 843;
        this.rememberUpgrade = t.rememberUpgrade || false;
        this.binaryType = null;
        this.onlyBinaryUpgrades = t.onlyBinaryUpgrades;
        this.pfx = t.pfx || null;
        this.key = t.key || null;
        this.passphrase = t.passphrase || null;
        this.cert = t.cert || null;
        this.ca = t.ca || null;
        this.ciphers = t.ciphers || null;
        this.rejectUnauthorized = t.rejectUnauthorized || null;
        this.open();
    }
    function o(e) {
        var t = {};
        for (var n in e) {
            if (e.hasOwnProperty(n)) {
                t[n] = e[n]
            };
        }
        return t;
    }
    var i = require("./transports"), s = require("component-emitter"), a = require("debug")("engine.io-client:socket"), u = require("indexof"), l = require("engine.io-parser"), c = require("parseuri"), p = require("parsejson"), d = require("parseqs");
    module.exports = r;
    r.priorWebsocketSuccess = false;
    s(r.prototype);
    r.protocol = l.protocol;
    r.Socket = r;
    r.Transport = require("./transport");
    r.transports = require("./transports");
    r.parser = require("engine.io-parser");
    r.prototype.createTransport = function(e) {
        a('creating transport "%s"', e);
        var t = o(this.query);
        t.EIO = l.protocol;
        t.transport = e;
        if (this.id) {
            t.sid = this.id
        };
        var n = new i[e]({
            agent: this.agent,
            hostname: this.hostname,
            port: this.port,
            secure: this.secure,
            path: this.path,
            query: t,
            forceJSONP: this.forceJSONP,
            jsonp: this.jsonp,
            forceBase64: this.forceBase64,
            enablesXDR: this.enablesXDR,
            timestampRequests: this.timestampRequests,
            timestampParam: this.timestampParam,
            policyPort: this.policyPort,
            socket: this,
            pfx: this.pfx,
            key: this.key,
            passphrase: this.passphrase,
            cert: this.cert,
            ca: this.ca,
            ciphers: this.ciphers,
            rejectUnauthorized: this.rejectUnauthorized
        });
        return n;
    };
    r.prototype.open = function() {
        var e;
        if (this.rememberUpgrade && r.priorWebsocketSuccess && this.transports.indexOf("websocket") != -1) {
            e = "websocket";
        } else {
            if (this.transports.length == 0) {
                var t = this;
                return void setTimeout(function() {
                    t.emit("error", "No transports available");
                }, 0);
            }
            e = this.transports[0];
        }
        this.readyState = "opening";
        var e;
        try {
            e = this.createTransport(e);
        } catch (n) {
            return this.transports.shift(), void this.open();
        }
        e.open();
        this.setTransport(e);
    };
    r.prototype.setTransport = function(e) {
        a("setting transport %s", e.name);
        var t = this;
        if (this.transport) {
            a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()
        };
        this.transport = e;
        e.on("drain", function() {
            t.onDrain();
        }).on("packet", function(e) {
            t.onPacket(e);
        }).on("error", function(e) {
            t.onError(e);
        }).on("close", function() {
            t.onClose("transport close");
        });
    };
    r.prototype.probe = function(e) {
        function t() {
            if (d.onlyBinaryUpgrades) {
                var t = !this.supportsBinary && d.transport.supportsBinary;
                p = p || t;
            }
            p || (a('probe transport "%s" opened', e), c.send([ {
                type: "ping",
                data: "probe"
            } ]), c.once("packet", function(t) {
                if (!p) {
                    if (t.type == "pong" && t.data == "probe") {
                        a('probe transport "%s" pong', e);
                        d.upgrading = true;
                        d.emit("upgrading", c);
                        if (!c) {
                            return;
                        }
                        r.priorWebsocketSuccess = c.name == "websocket";
                        a('pausing current transport "%s"', d.transport.name);
                        d.transport.pause(function() {
                            p || d.readyState != "closed" && (a("changing transport and sending upgrade packet"), 
                            l(), d.setTransport(c), c.send([ {
                                type: "upgrade"
                            } ]), d.emit("upgrade", c), c = null, d.upgrading = false, d.flush());
                        });
                    } else {
                        a('probe transport "%s" failed', e);
                        var n = new Error("probe error");
                        n.transport = c.name;
                        d.emit("upgradeError", n);
                    }
                }
            }));
        }
        function n() {
            p || (p = true, l(), c.close(), c = null);
        }
        function o(t) {
            var r = new Error("probe error: " + t);
            r.transport = c.name;
            n();
            a('probe transport "%s" failed because of error: %s', e, t);
            d.emit("upgradeError", r);
        }
        function i() {
            o("transport closed");
        }
        function s() {
            o("socket closed");
        }
        function u(e) {
            if (c && e.name != c.name) {
                a('"%s" works - aborting "%s"', e.name, c.name), n()
            };
        }
        function l() {
            c.removeListener("open", t);
            c.removeListener("error", o);
            c.removeListener("close", i);
            d.removeListener("close", s);
            d.removeListener("upgrading", u);
        }
        a('probing transport "%s"', e);
        var c = this.createTransport(e, {
            probe: 1
        }), p = false, d = this;
        r.priorWebsocketSuccess = false;
        c.once("open", t);
        c.once("error", o);
        c.once("close", i);
        this.once("close", s);
        this.once("upgrading", u);
        c.open();
    };
    r.prototype.onOpen = function() {
        a("socket open");
        this.readyState = "open";
        r.priorWebsocketSuccess = this.transport.name == "websocket";
        this.emit("open");
        this.flush();
        if (this.readyState == "open" && this.upgrade && this.transport.pause) {
            a("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; t > e; e++) {
                this.probe(this.upgrades[e]);
            }
        }
    };
    r.prototype.onPacket = function(e) {
        if (this.readyState == "opening" || this.readyState == "open") {
            switch (a('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), 
            this.emit("heartbeat"), e.type) {
              case "open":
                this.onHandshake(p(e.data));
                break;

              case "pong":
                this.setPing();
                break;

              case "error":
                var t = new Error("server error");
                t.code = e.data;
                this.emit("error", t);
                break;

              case "message":
                this.emit("data", e.data);
                this.emit("message", e.data);
            }
        } else {
            a('packet received with socket readyState "%s"', this.readyState);
        }
    };
    r.prototype.onHandshake = function(e) {
        this.emit("handshake", e);
        this.id = e.sid;
        this.transport.query.sid = e.sid;
        this.upgrades = this.filterUpgrades(e.upgrades);
        this.pingInterval = e.pingInterval;
        this.pingTimeout = e.pingTimeout;
        this.onOpen();
        if (this.readyState != "closed") {
            this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat)
        };
    };
    r.prototype.onHeartbeat = function(e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout(function() {
            if (t.readyState != "closed") {
                t.onClose("ping timeout")
            };
        }, e || t.pingInterval + t.pingTimeout);
    };
    r.prototype.setPing = function() {
        var e = this;
        clearTimeout(e.pingIntervalTimer);
        e.pingIntervalTimer = setTimeout(function() {
            a("writing ping packet - expecting pong within %sms", e.pingTimeout);
            e.ping();
            e.onHeartbeat(e.pingTimeout);
        }, e.pingInterval);
    };
    r.prototype.ping = function() {
        this.sendPacket("ping");
    };
    r.prototype.onDrain = function() {
        for (var e = 0; e < this.prevBufferLen; e++) {
            if (this.callbackBuffer[e]) {
                this.callbackBuffer[e]()
            };
        }
        this.writeBuffer.splice(0, this.prevBufferLen);
        this.callbackBuffer.splice(0, this.prevBufferLen);
        this.prevBufferLen = 0;
        if (this.writeBuffer.length == 0) {
            this.emit("drain");
        } else {
            this.flush();
        }
    };
    r.prototype.flush = function() {
        if (this.readyState != "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), 
            this.prevBufferLen = this.writeBuffer.length, this.emit("flush")
        };
    };
    r.prototype.write = r.prototype.send = function(e, t) {
        this.sendPacket("message", e, t);
        return this;
    };
    r.prototype.sendPacket = function(e, t, n) {
        if (this.readyState != "closing" && this.readyState != "closed") {
            var r = {
                type: e,
                data: t
            };
            this.emit("packetCreate", r);
            this.writeBuffer.push(r);
            this.callbackBuffer.push(n);
            this.flush();
        }
    };
    r.prototype.close = function() {
        function e() {
            r.onClose("forced close");
            a("socket closing - telling transport to close");
            r.transport.close();
        }
        function t() {
            r.removeListener("upgrade", t);
            r.removeListener("upgradeError", t);
            e();
        }
        function n() {
            r.once("upgrade", t);
            r.once("upgradeError", t);
        }
        if (this.readyState == "opening" || this.readyState == "open") {
            this.readyState = "closing";
            var r = this;
            if (this.writeBuffer.length) {
                this.once("drain", function() {
                    if (this.upgrading) {
                        n();
                    } else {
                        e();
                    }
                });
            } else {
                if (this.upgrading) {
                    n();
                } else {
                    e();
                }
            }
        }
        return this;
    };
    r.prototype.onError = function(e) {
        a("socket error %j", e);
        r.priorWebsocketSuccess = false;
        this.emit("error", e);
        this.onClose("transport error", e);
    };
    r.prototype.onClose = function(e, t) {
        if (this.readyState == "opening" || this.readyState == "open" || this.readyState == "closing") {
            a('socket close with reason: "%s"', e);
            var n = this;
            clearTimeout(this.pingIntervalTimer);
            clearTimeout(this.pingTimeoutTimer);
            setTimeout(function() {
                n.writeBuffer = [];
                n.callbackBuffer = [];
                n.prevBufferLen = 0;
            }, 0);
            this.transport.removeAllListeners("close");
            this.transport.close();
            this.transport.removeAllListeners();
            this.readyState = "closed";
            this.id = null;
            this.emit("close", e, t);
        }
    };
    r.prototype.filterUpgrades = function(e) {
        for (var t = [], n = 0, r = e.length; r > n; n++) {
            if (~u(this.transports, e[n])) {
                t.push(e[n])
            };
        }
        return t;
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
