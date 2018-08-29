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
    n.prototype.id = "slash-commands-disabled-warning";
    n.prototype.template = require("../../templates/shared/slash_commands_disabled_warning.mustache");
    n.prototype.events = function() {
        return {
            "click .coach-tooltip-next": "replaceText",
            "click .coach-tooltip-stop": this.close
        };
    };
    n.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
    };
    n.prototype.close = function() {
        this.closeSelf();
        return this.options.close();
    };
    n.prototype.closeSelf = function() {
        return this.fadeOut(function(e) {
            return function() {
                var t;
                if ((t = e.tether) != null) {
                    t.destroy()
                };
                return e.destructor();
            };
        }(this));
    };
    n.prototype.replaceText = function() {
        this.options.inputBox.setText(this.options.commandText);
        return this.close();
    };
    n.prototype.serializeData = function() {
        return {
            warningText: this.options.warningText
        };
    };
    return n;
}(r);

module.exports = o;
