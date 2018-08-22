"use strict";

function r(e, t) {
    var n = {};
    return function(r) {
        n[t] = r;
        e.setState(n);
    };
}

var o = {
    createStateSetter: function(e, t) {
        return function(n, r, o, i, s, a) {
            var u = t.call(e, n, r, o, i, s, a);
            if (u) {
                e.setState(u)
            };
        };
    },
    createStateKeySetter: function(e, t) {
        var n = e.__keySetters || (e.__keySetters = {});
        return n[t] || (n[t] = r(e, t));
    }
};

o.Mixin = {
    createStateSetter: function(e) {
        return o.createStateSetter(this, e);
    },
    createStateKeySetter: function(e) {
        return o.createStateKeySetter(this, e);
    }
};

module.exports = o;
