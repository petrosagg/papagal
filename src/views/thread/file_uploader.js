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

o = require("../shared/file_uploader");

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    i(t, e);
    t.prototype.initialize = function(e) {
        this.thread = e.thread;
        return t.__super__.initialize.apply(this, arguments);
    };
    t.prototype.messageOptions = function() {
        return _.extend({}, t.__super__.messageOptions.apply(this, arguments), {
            thread_id: this.thread.threadId()
        });
    };
    t.prototype.endpointUrl = function() {
        return this.model.url() + "/threads/" + this.thread.threadId() + "/messages";
    };
    return t;
}(o);

module.exports = r;
