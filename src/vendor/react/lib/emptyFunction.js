function r(e) {
    return function() {
        return e;
    };
}

function o() {}

o.thatReturns = r;

o.thatReturnsFalse = r(!1);

o.thatReturnsTrue = r(!0);

o.thatReturnsNull = r(null);

o.thatReturnsThis = function() {
    return this;
};

o.thatReturnsArgument = function(e) {
    return e;
};

module.exports = o;