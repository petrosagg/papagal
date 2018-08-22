function r(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}

module.exports = r;