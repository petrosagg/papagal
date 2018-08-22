module.exports = function(e, t) {
    var n = function() {};
    n.prototype = t.prototype;
    e.prototype = new n();
    e.prototype.constructor = e;
};