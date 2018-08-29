function r(e, t, n) {
    var r;
    return r = t ? new i(e, t) : new i(e);
}

var o = function() {
    return this;
}(), i = o.WebSocket || o.MozWebSocket;

if (i) {
    module.exports = r;
} else {
    module.exports = null;
}

if (i) {
    r.prototype = i.prototype
};
