(function(n) {
    function r() {}
    function o(e) {
        i.call(this, e);
        this.query = this.query || {};
        if (!a) {
            n.___eio || (n.___eio = []), a = n.___eio
        };
        this.index = a.length;
        var t = this;
        a.push(function(e) {
            t.onData(e);
        });
        this.query.j = this.index;
        if (n.document && n.addEventListener) {
            n.addEventListener("beforeunload", function() {
                if (t.script) {
                    t.script.onerror = r
                };
            }, false)
        };
    }
    var i = require("./polling"), s = require("component-inherit");
    module.exports = o;
    var a, u = /\n/g, l = /\\n/g;
    s(o, i);
    o.prototype.supportsBinary = false;
    o.prototype.doClose = function() {
        if (this.script) {
            this.script.parentNode.removeChild(this.script), this.script = null
        };
        if (this.form) {
            this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null
        };
        i.prototype.doClose.call(this);
    };
    o.prototype.doPoll = function() {
        var e = this, t = document.createElement("script");
        if (this.script) {
            this.script.parentNode.removeChild(this.script), this.script = null
        };
        t.async = true;
        t.src = this.uri();
        t.onerror = function(t) {
            e.onError("jsonp poll error", t);
        };
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(t, n);
        this.script = t;
        var r = typeof navigator != "undefined" && /gecko/i.test(navigator.userAgent);
        if (r) {
            setTimeout(function() {
                var e = document.createElement("iframe");
                document.body.appendChild(e);
                document.body.removeChild(e);
            }, 100)
        };
    };
    o.prototype.doWrite = function(e, t) {
        function n() {
            r();
            t();
        }
        function r() {
            if (o.iframe) {
                try {
                    o.form.removeChild(o.iframe);
                } catch (e) {
                    o.onError("jsonp polling iframe removal error", e);
                }
            }
            try {
                var t = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                i = document.createElement(t);
            } catch (e) {
                i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0";
            }
            i.id = o.iframeId;
            o.form.appendChild(i);
            o.iframe = i;
        }
        var o = this;
        if (!this.form) {
            var i, s = document.createElement("form"), a = document.createElement("textarea"), c = this.iframeId = "eio_iframe_" + this.index;
            s.className = "socketio";
            s.style.position = "absolute";
            s.style.top = "-1000px";
            s.style.left = "-1000px";
            s.target = c;
            s.method = "POST";
            s.setAttribute("accept-charset", "utf-8");
            a.name = "d";
            s.appendChild(a);
            document.body.appendChild(s);
            this.form = s;
            this.area = a;
        }
        this.form.action = this.uri();
        r();
        e = e.replace(l, "\\\n");
        this.area.value = e.replace(u, "\\n");
        try {
            this.form.submit();
        } catch (p) {}
        if (this.iframe.attachEvent) {
            this.iframe.onreadystatechange = function() {
                if (o.iframe.readyState == "complete") {
                    n()
                };
            };
        } else {
            this.iframe.onload = n;
        }
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
