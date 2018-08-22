var r = Object.prototype.hasOwnProperty;

exports.keys = Object.keys || function(e) {
    var t = [];
    for (var n in e) {
        if (r.call(e, n)) {
            t.push(n)
        };
    }
    return t;
};

exports.values = function(e) {
    var t = [];
    for (var n in e) {
        if (r.call(e, n)) {
            t.push(e[n])
        };
    }
    return t;
};

exports.merge = function(e, t) {
    for (var n in t) {
        if (r.call(t, n)) {
            e[n] = t[n]
        };
    }
    return e;
};

exports.length = function(e) {
    return exports.keys(e).length;
};

exports.isEmpty = function(e) {
    return exports.length(e) == 0;
};
