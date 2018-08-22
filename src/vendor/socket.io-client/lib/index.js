function r(e, t) {
    if (typeof e == "object") {
        t = e, e = void 0
    };
    t = t || {};
    var n, r = o(e), i = r.source, l = r.id;
    t.forceNew || t["force new connection"] || t.multiplex === !1 ? (a("ignoring socket cache for %s", i), 
    n = s(i, t)) : (u[l] || (a("new io instance for %s", i), u[l] = s(i, t)), n = u[l]);
    return n.socket(r.path);
}

var o = require("./url"), i = require("socket.io-parser"), s = require("./manager"), a = require("debug")("socket.io-client");

module.exports = global = r;

var u = global.managers = {};

global.protocol = i.protocol;

global.connect = r;

global.Manager = require("./manager");

global.Socket = require("./socket");