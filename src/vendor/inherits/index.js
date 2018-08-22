typeof Object.create == "function" ? module.exports = function(e, t) {
    e.super_ = t;
    e.prototype = Object.create(t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    });
} : module.exports = function(e, t) {
    e.super_ = t;
    var n = function() {};
    n.prototype = t.prototype;
    e.prototype = new n();
    e.prototype.constructor = e;
};
