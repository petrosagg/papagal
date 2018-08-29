if (typeof Object.create == "function") {
    module.exports = function(e, t) {
        e.super_ = t;
        e.prototype = Object.create(t.prototype, {
            constructor: {
                value: e,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
    };
} else {
    module.exports = function(e, t) {
        e.super_ = t;
        var n = function() {};
        n.prototype = t.prototype;
        e.prototype = new n();
        e.prototype.constructor = e;
    };
}
