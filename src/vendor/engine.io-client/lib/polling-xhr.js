(function(n) {
    function r() {}
    function o(e) {
        u.call(this, e);
        if (n.location) {
            var t = location.protocol == "https:", r = location.port;
            r || (r = t ? 443 : 80);
            this.xd = e.hostname != n.location.hostname || r != e.port;
            this.xs = e.secure != t;
        }
    }
    function i(e) {
        this.method = e.method || "GET";
        this.uri = e.uri;
        this.xd = !!e.xd;
        this.xs = !!e.xs;
        this.async = !1 !== e.async;
        this.data = e.data != void 0 ? e.data : null;
        this.agent = e.agent;
        this.isBinary = e.isBinary;
        this.supportsBinary = e.supportsBinary;
        this.enablesXDR = e.enablesXDR;
        this.pfx = e.pfx;
        this.key = e.key;
        this.passphrase = e.passphrase;
        this.cert = e.cert;
        this.ca = e.ca;
        this.ciphers = e.ciphers;
        this.rejectUnauthorized = e.rejectUnauthorized;
        this.create();
    }
    function s() {
        for (var e in i.requests) {
            if (i.requests.hasOwnProperty(e)) {
                i.requests[e].abort()
            };
        }
    }
    var a = require("xmlhttprequest"), u = require("./polling"), l = require("component-emitter"), c = require("component-inherit"), p = require("debug")("engine.io-client:polling-xhr");
    module.exports = o;
    module.exports.Request = i;
    c(o, u);
    o.prototype.supportsBinary = !0;
    o.prototype.request = function(e) {
        e = e || {};
        e.uri = this.uri();
        e.xd = this.xd;
        e.xs = this.xs;
        e.agent = this.agent || !1;
        e.supportsBinary = this.supportsBinary;
        e.enablesXDR = this.enablesXDR;
        e.pfx = this.pfx;
        e.key = this.key;
        e.passphrase = this.passphrase;
        e.cert = this.cert;
        e.ca = this.ca;
        e.ciphers = this.ciphers;
        e.rejectUnauthorized = this.rejectUnauthorized;
        return new i(e);
    };
    o.prototype.doWrite = function(e, t) {
        var n = typeof e != "string" && void 0 !== e, r = this.request({
            method: "POST",
            data: e,
            isBinary: n
        }), o = this;
        r.on("success", t);
        r.on("error", function(e) {
            o.onError("xhr post error", e);
        });
        this.sendXhr = r;
    };
    o.prototype.doPoll = function() {
        p("xhr poll");
        var e = this.request(), t = this;
        e.on("data", function(e) {
            t.onData(e);
        });
        e.on("error", function(e) {
            t.onError("xhr poll error", e);
        });
        this.pollXhr = e;
    };
    l(i.prototype);
    i.prototype.create = function() {
        var e = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
        };
        e.pfx = this.pfx;
        e.key = this.key;
        e.passphrase = this.passphrase;
        e.cert = this.cert;
        e.ca = this.ca;
        e.ciphers = this.ciphers;
        e.rejectUnauthorized = this.rejectUnauthorized;
        var t = this.xhr = new a(e), r = this;
        try {
            p("xhr open %s: %s", this.method, this.uri);
            t.open(this.method, this.uri, this.async);
            if (this.supportsBinary) {
                t.responseType = "arraybuffer"
            };
            if (this.method == "POST") {
                try {
                    if (this.isBinary) {
                        t.setRequestHeader("Content-type", "application/octet-stream");
                    } else t.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
                } catch (o) {}
            }
            if ("withCredentials" in t) {
                t.withCredentials = !0
            };
            if (this.hasXDR()) {
                t.onload = function() {
                    r.onLoad();
                };
                t.onerror = function() {
                    r.onError(t.responseText);
                };
            } else t.onreadystatechange = function() {
                if (t.readyState == 4) {
                    t.status == 200 || t.status == 1223 ? r.onLoad() : setTimeout(function() {
                        r.onError(t.status);
                    }, 0)
                };
            };
            p("xhr data %s", this.data);
            t.send(this.data);
        } catch (o) {
            return void setTimeout(function() {
                r.onError(o);
            }, 0);
        }
        if (n.document) {
            this.index = i.requestsCount++, i.requests[this.index] = this
        };
    };
    i.prototype.onSuccess = function() {
        this.emit("success");
        this.cleanup();
    };
    i.prototype.onData = function(e) {
        this.emit("data", e);
        this.onSuccess();
    };
    i.prototype.onError = function(e) {
        this.emit("error", e);
        this.cleanup(!0);
    };
    i.prototype.cleanup = function(e) {
        if (typeof this.xhr != "undefined" && null !== this.xhr) {
            if (this.hasXDR()) {
                this.xhr.onload = this.xhr.onerror = r;
            } else this.xhr.onreadystatechange = r;
            if (e) {
                try {
                    this.xhr.abort();
                } catch (t) {}
            }
            if (n.document) {
                delete i.requests[this.index]
            };
            this.xhr = null;
        }
    };
    i.prototype.onLoad = function() {
        var e;
        try {
            var t;
            try {
                t = this.xhr.getResponseHeader("Content-Type").split(";")[0];
            } catch (n) {}
            e = t === "application/octet-stream" ? this.xhr.response : this.supportsBinary ? "ok" : this.xhr.responseText;
        } catch (n) {
            this.onError(n);
        }
        if (e != null) {
            this.onData(e)
        };
    };
    i.prototype.hasXDR = function() {
        return typeof n.XDomainRequest != "undefined" && !this.xs && this.enablesXDR;
    };
    i.prototype.abort = function() {
        this.cleanup();
    };
    if (n.document) {
        i.requestsCount = 0, i.requests = {}, n.attachEvent ? n.attachEvent("onunload", s) : n.addEventListener && n.addEventListener("beforeunload", s, !1)
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
