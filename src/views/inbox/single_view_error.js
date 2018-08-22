var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Views.Inbox.SingleViewError = function(t) {
    function SingleViewError() {
        return SingleViewError.__super__.constructor.apply(this, arguments);
    }
    r(SingleViewError, t);
    SingleViewError.prototype.tagName = "div";
    SingleViewError.prototype.className = "message-error";
    SingleViewError.prototype.defaults = {
        report: !0
    };
    SingleViewError.prototype.initialize = function(e) {
        this.options = _.extend(this.defaults, e);
        return SingleViewError.__super__.initialize.call(this, this.options);
    };
    SingleViewError.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/inbox/single_view_error.mustache"))({
            title: this.model.get("title"),
            report: this.options.report
        }));
        return this;
    };
    return SingleViewError;
}(Views.Shared.MessageError);