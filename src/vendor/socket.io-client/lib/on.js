function r(e, t, n) {
    e.on(t, n);
    return {
        destroy: function() {
            e.removeListener(t, n);
        }
    };
}

module.exports = r;