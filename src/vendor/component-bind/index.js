var r = [].slice;

module.exports = function(e, t) {
    if (typeof t == "string") {
        t = e[t]
    };
    if (typeof t != "function") {
        throw new Error("bind() requires a function");
    }
    var n = r.call(arguments, 2);
    return function() {
        return t.apply(e, n.concat(r.call(arguments)));
    };
};
