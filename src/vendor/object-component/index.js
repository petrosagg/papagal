var r = Object.prototype.hasOwnProperty;

global.keys = Object.keys || function(e) {
    var t = [];
    for (var n in e) {
        if (r.call(e, n)) {
            t.push(n)
        };
    }
    return t;
};

global.values = function(e) {
    var t = [];
    for (var n in e) {
        if (r.call(e, n)) {
            t.push(e[n])
        };
    }
    return t;
};

global.merge = function(e, t) {
    for (var n in t) {
        if (r.call(t, n)) {
            e[n] = t[n]
        };
    }
    return e;
};

global.length = function(e) {
    return global.keys(e).length;
};

global.isEmpty = function(e) {
    return global.length(e) == 0;
};