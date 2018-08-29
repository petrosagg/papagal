function r(e) {
    return function() {
        return e;
    };
}

function o() {}

o.thatReturns = r;

o.thatReturnsFalse = r(false);

o.thatReturnsTrue = r(true);

o.thatReturnsNull = r(null);

o.thatReturnsThis = function() {
    return this;
};

o.thatReturnsArgument = function(e) {
    return e;
};

module.exports = o;
