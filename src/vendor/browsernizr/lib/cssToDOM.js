function r(e) {
    return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
        return t + n.toUpperCase();
    }).replace(/^-/, "");
}

module.exports = r;
