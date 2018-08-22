var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("./coach_tooltip");

o = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    i(n, t);
    n.prototype.template = require("../../templates/shared/everyone_warning.mustache");
    n.prototype.id = "everyone-tip";
    n.prototype.events = function() {
        return {
            "click .coach-tooltip-next": function(e) {
                return function() {
                    var t;
                    if (typeof (t = e.options).onConfirm == "function") {
                        return t.onConfirm();
                    }
                    return;
                };
            }(this),
            "click .coach-tooltip-stop": function(e) {
                return function() {
                    var t;
                    if (typeof (t = e.options).onCancel == "function") {
                        return t.onCancel();
                    }
                    return;
                };
            }(this)
        };
    };
    n.prototype.serializeData = function() {
        return {
            flowName: this.options.flowName,
            userCount: this.options.userCount,
            usedTag: this.options.usedTag
        };
    };
    return n;
}(r);

module.exports = o;