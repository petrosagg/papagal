!function(e, n) {
    function r(e, t) {
        try {
            if (typeof e != "function") {
                return e;
            }
            if (!e.bugsnag) {
                var n = i();
                e.bugsnag = function(r) {
                    if (t && t.eventHandler) {
                        w = r
                    };
                    k = n;
                    if (!E) {
                        var o = e.apply(this, arguments);
                        k = null;
                        return o;
                    }
                    try {
                        return e.apply(this, arguments);
                    } catch (i) {
                        throw d("autoNotify", !0) && (C.notifyException(i, null, null, "error"), y()), i;
                    } finally {
                        k = null;
                    }
                };
                e.bugsnag.bugsnag = e.bugsnag;
            }
            return e.bugsnag;
        } catch (r) {
            return e;
        }
    }
    function o() {
        A = false;
    }
    function i() {
        var e = document.currentScript || k;
        if (!e && A) {
            var t = document.scripts || document.getElementsByTagName("script");
            e = t[t.length - 1];
        }
        return e;
    }
    function s(e) {
        var t = i();
        if (t) {
            e.script = {
                src: t.src,
                content: d("inlineScript", true) ? t.innerHTML : ""
            }
        };
    }
    function a(t) {
        var n = d("disableLog"), r = e.console;
        if (!(r === undefined || r.log === undefined || n)) {
            r.log("[Bugsnag] " + t)
        };
    }
    function u(t, n, r) {
        var o = d("maxDepth", D);
        if (r >= o) {
            return encodeURIComponent(n) + "=[RECURSIVE]";
        }
        r = r + 1 || 1;
        try {
            if (e.Node && t instanceof e.Node) {
                return encodeURIComponent(n) + "=" + encodeURIComponent(b(t));
            }
            var i = [];
            for (var s in t) {
                if (t.hasOwnProperty(s) && s != null && t[s] != null) {
                    var a = n ? n + "[" + s + "]" : s, l = t[s];
                    i.push(typeof l == "object" ? u(l, a, r) : encodeURIComponent(a) + "=" + encodeURIComponent(l));
                }
            }
            return i.join("&");
        } catch (c) {
            return encodeURIComponent(n) + "=" + encodeURIComponent("" + c);
        }
    }
    function l(e, t, n) {
        if (t == null) {
            return e;
        }
        if (n >= d("maxDepth", D)) {
            return "[RECURSIVE]";
        }
        e = e || {};
        for (var r in t) {
            if (t.hasOwnProperty(r)) {
                try {
                    if (t[r].constructor === Object) {
                        e[r] = l(e[r], t[r], n + 1 || 1);
                    } else {
                        e[r] = t[r];
                    }
                } catch (o) {
                    e[r] = t[r];
                }
            }
        }
        return e;
    }
    function c(e, t) {
        e += "?" + u(t) + "&ct=img&cb=" + new Date().getTime();
        if (typeof BUGSNAG_TESTING != "undefined" && C.testRequest) {
            C.testRequest(e, t);
        } else {
            var n = new Image();
            n.src = e;
        }
    }
    function p(e) {
        var t = {}, n = /^data\-([\w\-]+)$/;
        if (e) {
            for (var r = e.attributes, o = 0; o < r.length; o++) {
                var i = r[o];
                if (n.test(i.nodeName)) {
                    var s = i.nodeName.match(n)[1];
                    t[s] = i.value || i.nodeValue;
                }
            }
        }
        return t;
    }
    function d(e, t) {
        M = M || p(R);
        var n = C[e] !== undefined ? C[e] : M[e.toLowerCase()];
        if (n === "false") {
            n = false
        };
        if (n !== undefined) {
            return n;
        }
        return t;
    }
    function h(e) {
        if (e && e.match(F)) {
            return true;
        }
        a("Invalid API key '" + e + "'");
        return false;
    }
    function f(t, n) {
        var r = d("apiKey");
        if (h(r) && S) {
            S -= 1;
            var o = d("releaseStage", "production"), i = d("notifyReleaseStages");
            if (i) {
                for (var s = false, u = 0; u < i.length; u++) {
                    if (o === i[u]) {
                        s = true;
                        break;
                    }
                }
                if (!s) {
                    return;
                }
            }
            var p = [ t.name, t.message, t.stacktrace ].join("|");
            if (p !== x) {
                x = p;
                if (w) {
                    n = n || {}, n["Last Event"] = v(w)
                };
                var f = {
                    notifierVersion: P,
                    apiKey: r,
                    projectRoot: d("projectRoot") || e.location.protocol + "//" + e.location.host,
                    context: d("context") || e.location.pathname,
                    userId: d("userId"),
                    user: d("user"),
                    metaData: l(l({}, d("metaData")), n),
                    releaseStage: o,
                    appVersion: d("appVersion"),
                    url: e.location.href,
                    userAgent: navigator.userAgent,
                    language: navigator.language || navigator.userLanguage,
                    severity: t.severity,
                    name: t.name,
                    message: t.message,
                    stacktrace: t.stacktrace,
                    file: t.file,
                    lineNumber: t.lineNumber,
                    columnNumber: t.columnNumber,
                    payloadVersion: "2"
                }, m = C.beforeNotify;
                if (typeof m == "function") {
                    var g = m(f, f.metaData);
                    if (g === false) {
                        return;
                    }
                }
                if (f.lineNumber === 0 && /Script error\.?/.test(f.message)) {
                    return a("Ignoring cross-domain script error. See https://bugsnag.com/docs/notifiers/js/cors");
                }
                return void c(d("endpoint") || I, f);
            }
        }
    }
    function m() {
        var e, t, n = 10, r = "[anonymous]";
        try {
            throw new Error("");
        } catch (o) {
            e = "<generated>\n", t = g(o);
        }
        if (!t) {
            e = "<generated-ie>\n";
            var i = [];
            try {
                for (var s = arguments.callee.caller.caller; s && i.length < n; ) {
                    var u = N.test(s.toString()) ? RegExp.$1 || r : r;
                    i.push(u);
                    s = s.caller;
                }
            } catch (l) {
                a(l);
            }
            t = i.join("\n");
        }
        return e + t;
    }
    function g(e) {
        return e.stack || e.backtrace || e.stacktrace;
    }
    function v(e) {
        var t = {
            millisecondsAgo: new Date() - e.timeStamp,
            type: e.type,
            which: e.which,
            target: b(e.target)
        };
        return t;
    }
    function b(e) {
        if (e) {
            var t = e.attributes;
            if (t) {
                for (var n = "<" + e.nodeName.toLowerCase(), r = 0; r < t.length; r++) {
                    if (t[r].value && t[r].value.toString() != "null") {
                        n += " " + t[r].name + '="' + t[r].value + '"'
                    };
                }
                return n + ">";
            }
            return e.nodeName;
        }
    }
    function y() {
        T += 1;
        e.setTimeout(function() {
            T -= 1;
        });
    }
    function _(t, n, r) {
        var o = t[n], i = r(o);
        t[n] = i;
        if (typeof BUGSNAG_TESTING != "undefined" && e.undo) {
            e.undo.push(function() {
                t[n] = o;
            })
        };
    }
    var w, k, x, C = {}, E = true, T = 0, S = 10, D = 5;
    C.noConflict = function() {
        e.Bugsnag = n;
        return C;
    };
    C.refresh = function() {
        S = 10;
    };
    C.notifyException = function(e, t, n, r) {
        if (e) {
            t && typeof t != "string" && (n = t, t = undefined), n || (n = {}), s(n), f({
                name: t || e.name,
                message: e.message || e.description,
                stacktrace: g(e) || m(),
                file: e.fileName || e.sourceURL,
                lineNumber: e.lineNumber || e.line,
                columnNumber: e.columnNumber ? e.columnNumber + 1 : undefined,
                severity: r || "warning"
            }, n)
        };
    };
    C.notify = function(t, n, r, o) {
        f({
            name: t,
            message: n,
            stacktrace: m(),
            file: e.location.toString(),
            lineNumber: 1,
            severity: o || "warning"
        }, r);
    };
    var A = document.readyState !== "complete";
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", o, true);
        e.addEventListener("load", o, true);
    } else {
        e.attachEvent("onload", o);
    }
    var M, F = /^[0-9a-f]{32}$/i, N = /function\s*([\w\-$]+)?\s*\(/i, O = "https://notify.bugsnag.com/", I = O + "js", P = "2.4.9", L = document.getElementsByTagName("script"), R = L[L.length - 1];
    if (e.atob) {
        if (e.ErrorEvent) {
            try {
                if (new e.ErrorEvent("test").colno === 0) {
                    E = false
                };
            } catch (B) {}
        }
    } else {
        E = false;
    }
    if (d("autoNotify", true)) {
        _(e, "onerror", function(t) {
            if (typeof BUGSNAG_TESTING != "undefined") {
                C._onerror = t
            };
            return function(n, r, o, i, a) {
                var u = d("autoNotify", true), l = {};
                if (!i && e.event) {
                    i = e.event.errorCharacter
                };
                s(l);
                k = null;
                if (u && !T) {
                    f({
                        name: a && a.name || "window.onerror",
                        message: n,
                        file: r,
                        lineNumber: o,
                        columnNumber: i,
                        stacktrace: a && g(a) || m(),
                        severity: "error"
                    }, l)
                };
                if (typeof BUGSNAG_TESTING != "undefined") {
                    t = C._onerror
                };
                if (t) {
                    t(n, r, o, i, a)
                };
            };
        });
        var j = function(e) {
            return function(t, n) {
                if (typeof t == "function") {
                    t = r(t);
                    var o = Array.prototype.slice.call(arguments, 2);
                    return e(function() {
                        t.apply(this, o);
                    }, n);
                }
                return e(t, n);
            };
        };
        _(e, "setTimeout", j);
        _(e, "setInterval", j);
        if (e.requestAnimationFrame) {
            _(e, "requestAnimationFrame", function(e) {
                return function(t) {
                    return e(r(t));
                };
            })
        };
        if (e.setImmediate) {
            _(e, "setImmediate", function(e) {
                return function(t) {
                    var n = Array.prototype.slice.call(arguments);
                    n[0] = r(n[0]);
                    return e.apply(this, n);
                };
            })
        };
        "EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g, function(t) {
            var n = e[t] && e[t].prototype;
            if (n && n.hasOwnProperty && n.hasOwnProperty("addEventListener")) {
                _(n, "addEventListener", function(e) {
                    return function(t, n, o, i) {
                        try {
                            if (n && n.handleEvent) {
                                n.handleEvent = r(n.handleEvent, {
                                    eventHandler: true
                                })
                            };
                        } catch (s) {
                            a(s);
                        }
                        return e.call(this, t, r(n, {
                            eventHandler: true
                        }), o, i);
                    };
                }), _(n, "removeEventListener", function(e) {
                    return function(t, n, o, i) {
                        e.call(this, t, n, o, i);
                        return e.call(this, t, r(n), o, i);
                    };
                })
            };
        });
    }
    e.Bugsnag = C;
    if (typeof define == "function" && define.amd) {
        define([], function() {
            return C;
        });
    } else {
        if (typeof module == "object" && typeof module.exports == "object") {
            module.exports = C
        };
    }
}(window, window.Bugsnag);
