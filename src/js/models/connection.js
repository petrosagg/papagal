var r, o, i, s;

o = require("socket.io-client");

s = function(e) {
    return function(t) {
        return e === t;
    };
};

i = function() {
    return new Date().getTime();
};

Models.Connection = function() {
    function Connection() {
        var t;
        this.io = Models.Connection.io();
        this.outgoing = {};
        this.flows = [];
        this.messages = new Bacon.Bus();
        this.states = new Bacon.Bus();
        this.sendStream = new Bacon.Bus();
        this.internal = new Bacon.Bus();
        this.messages.plug(this.sendStream);
        this.connectionAlive = this.messages.filter(function(e) {
            return e.id;
        }).map(i).toProperty(i());
        this.state = this.states.toProperty(Models.Connection.CONNECTING).skipDuplicates();
        this.forcedReconnects = this.state.changes().errors().mapError(function(e) {
            return e;
        }).filter(function(e) {
            return (e != null ? e.code : undefined) === 11;
        });
        this.resetSocket();
        this.state.onValue(function(t) {
            return console.log("Connection state", t, Connection.REVERSE_STATE_MAP[t]);
        });
        t = this.state.filter(s(Models.Connection.OPEN)).changes().skip(1);
        this.ids = this.messages.merge(this.internal).scan({}, function(e, t) {
            !t.id || t.event === "activity.user" && e[t.flow] || (e[t.flow] = t.id);
            return e;
        });
        Bacon.combineAsArray(this.ids, this.connectionAlive).onValue(function() {});
        Bacon.combineAsArray(this.ids, this.connectionAlive).sampledBy(t).onValue(function(e) {
            return function(t) {
                var n, r, o, s;
                o = t[0];
                n = t[1];
                if (n + Models.Connection.INACTIVITY_THRESHOLD > i()) {
                    s = _.clone(e.outgoing);
                    return e.sync(o, function(t) {
                        if (t) {
                            return undefined;
                        }
                        return e.checkOutgoing(s);
                    });
                }
                console.log(new Date(), "all flows invalid");
                r = e.flows;
                e.flows = [];
                return e.messages.error({
                    error: "flow sync failed",
                    flows: r
                });
            };
        }(this));
        this.state.filter(s(Models.Connection.CLOSED)).onValue(function(e) {
            return function() {
                return e.messages.error("stream closed");
            };
        }(this));
        this.sendStream.onValue(function(e) {
            return function(t) {
                var n, r;
                r = function(n) {
                    delete e.outgoing[t.uuid];
                    return e.messages.error({
                        message: t,
                        error: n
                    });
                };
                n = function(e) {
                    if (e) {
                        return r(e);
                    }
                    return;
                };
                if (t.uuid) {
                    e.outgoing[t.uuid] = r
                };
                return e.socket.emit("message", t, n);
            };
        }(this));
        this.messages.filter(function(e) {
            return e.id;
        }).onValue(function(e) {
            return function(t) {
                return delete e.outgoing[t.uuid];
            };
        }(this));
        this.forcedReconnects.onValue(function(e) {
            return function(t) {
                console.error(new Date(), t);
                return e.reconnect();
            };
        }(this));
    }
    Connection.INACTIVITY_THRESHOLD = 18e5;
    Connection.CONNECTING = 0;
    Connection.OPEN = 1;
    Connection.CLOSED = 2;
    Connection.RECONNECTING = 3;
    Connection.REVERSE_STATE_MAP = {
        0: "CONNECTING",
        1: "OPEN",
        2: "CLOSED",
        3: "RECONNECTING"
    };
    Connection.io = function() {
        return o;
    };
    Connection.prototype.resetSocket = function() {
        var e;
        this.socket = this.userSocket = null;
        e = this.connect();
        this.socket = e.flows;
        this.userSocket = e.user;
        this.stateStream(this.socket);
        this.messagesStream(this.socket);
        return this.messagesStream(this.userSocket);
    };
    Connection.prototype.checkOutgoing = function(e) {
        var t, n, r, o;
        n = this.outgoing;
        r = [];
        for (o in n) {
            t = n[o];
            if (e[o]) {
                r.push(t());
            } else {
                r.push(undefined);
            }
        }
        return r;
    };
    Connection.prototype.formatIncomingMessage = function(e) {
        if (e.user && typeof e.user == "string") {
            e.user = parseInt(e.user, 10)
        };
        return e;
    };
    Connection.prototype.messagesStream = function(e) {
        var t;
        t = r(e, "message").map(function(e) {
            return e[1] || e[0];
        }).map(this.formatIncomingMessage);
        return this.messages.plug(t.takeUntil(this.forcedReconnects));
    };
    Connection.prototype.stateStream = function(e) {
        var t, n, r, o, i, s;
        n = Bacon.fromEventTarget(e, "connecting").map(function() {
            return Models.Connection.CONNECTING;
        });
        t = Bacon.fromEventTarget(e, "connect").map(function() {
            return Models.Connection.OPEN;
        });
        r = Bacon.fromEventTarget(e, "disconnect").map(function() {
            return Models.Connection.CLOSED;
        });
        i = Bacon.fromEventTarget(e, "reconnecting").map(function() {
            return Models.Connection.RECONNECTING;
        });
        o = Bacon.fromEventTarget(e, "reconnect").map(function() {
            return Models.Connection.OPEN;
        });
        Bacon.fromEventTarget(e, "error").onValue(function(e) {
            return function(t) {
                return e.messages.error(t);
            };
        }(this));
        Bacon.fromEventTarget(e, "connect_failed").onValue(function(e) {
            return function(t) {
                return e.messages.error(t);
            };
        }(this));
        s = Bacon.mergeAll([ t, n, r, o, i, this.messages.errors() ]).skipDuplicates().takeUntil(this.forcedReconnects);
        return this.states.plug(s);
    };
    Connection.prototype.subscribe = function(e, t) {
        var n;
        this.flows.push(e);
        n = function(e) {
            return function(n, r) {
                n || e.internal.push({
                    event: "last-event-id",
                    flow: r.id,
                    id: r.last_message_id
                });
                return t(n, r);
            };
        }(this);
        return this.socket.emit("subscribe", e, n);
    };
    Connection.prototype.unsubscribe = function(e, t) {
        var n;
        this.flows = function() {
            var t, r, o, i;
            for (o = this.flows, i = [], t = 0, r = o.length; r > t; t++) {
                n = o[t];
                if (n !== e) {
                    i.push(n)
                };
            }
            return i;
        }.call(this);
        return this.socket.emit("unsubscribe", e, function(e) {
            if (e && t) {
                return t();
            }
            return;
        });
    };
    Connection.prototype.sync = function(e, t) {
        var n, r, o, i, s;
        for (n = {}, console.log(new Date(), "sync", n), s = this.flows, o = 0, i = s.length; i > o; o++) {
            r = s[o];
            n[r] = e[r] || 0;
        }
        return this.socket.emit("resubscribe", n, function(e) {
            return function(n, o) {
                var i, s;
                if (n) {
                    o = e.flows;
                    e.flows = [];
                    e.messages.error({
                        error: "flow sync failed",
                        reason: n,
                        flows: o
                    });
                    if (typeof t == "function") {
                        return t("sync failed: " + n);
                    }
                } else {
                    i = [];
                    for (r in o) {
                        s = o[r];
                        if (s === false) {
                            i.push(r)
                        };
                    }
                    e.flows = _.difference(e.flows, i);
                    if (i.length > 0) {
                        console.log("sync failed!", i)
                    };
                    if (i.length > 0) {
                        e.messages.error({
                            error: "flow sync failed",
                            flows: i
                        })
                    };
                    if (typeof t == "function") {
                        return t();
                    }
                }
            };
        }(this));
    };
    Connection.prototype.disconnect = function() {
        var e, t, n, r;
        this.socket.disconnect();
        this.userSocket.disconnect();
        n = this.io.managers;
        r = [];
        for (t in n) {
            e = n[t];
            r.push(delete this.io.managers[t]);
        }
        return r;
    };
    Connection.prototype.reconnect = function() {
        console.log("resetting connection");
        this.disconnect();
        return setTimeout(function(e) {
            return function() {
                e.resetSocket();
                return e.states.push(Models.Connection.RECONNECTING);
            };
        }(this), 1e3);
    };
    Connection.prototype.connect = function() {
        var e, t, n;
        if (window.platform === "mobile") {
            n = [ "polling" ];
        } else {
            n = [ "polling", "websocket" ];
        }
        e = {
            transports: n,
            reconnectionAttempts: Infinity,
            reconnectionDelayMax: 16e3,
            path: "/jplex/",
            multiplex: true,
            timeout: 6e4
        };
        return t = {
            flows: this.io(window.location.protocol + "//" + window.location.host + "/flow", e),
            user: this.io(window.location.protocol + "//" + window.location.host + "/user", e)
        };
    };
    return Connection;
}();

r = function(e, t) {
    return new Bacon.EventStream(function(n) {
        var r, o;
        r = function() {
            var e;
            e = n(new Bacon.Next(arguments));
            if (e === Bacon.noMore) {
                return o();
            }
            return;
        };
        if (e.addEventListener) {
            o = function() {
                return e.removeEventListener(t, r, false);
            };
            e.addEventListener(t, r, false);
        } else {
            o = function() {
                return e.removeListener(t, r);
            };
            e.addListener(t, r);
        }
        return o;
    });
};
