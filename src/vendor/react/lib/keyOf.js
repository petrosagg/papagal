var r = function(e) {
    var t;
    for (t in e) {
        if (e.hasOwnProperty(t)) {
            return t;
        }
    }
    return null;
};

module.exports = r;
