function r(e, t, n) {
    var r;
    return r = t ? new i(e, t) : new i(e);
}

var o = function() {
    return this;
}(), i = o.WebSocket || o.MozWebSocket;

module.exports = i ? r : null;

if (i) {
    r.prototype = i.prototype
};