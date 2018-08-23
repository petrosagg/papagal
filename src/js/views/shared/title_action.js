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

Views.Shared.TitleAction = function(t) {
    function TitleAction() {
        return TitleAction.__super__.constructor.apply(this, arguments);
    }
    r(TitleAction, t);
    TitleAction.prototype.tagName = "li";
    TitleAction.prototype.className = "title-action";
    TitleAction.prototype.template = require("../../templates/shared/title_action.mustache");
    TitleAction.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        TitleAction.__super__.initialize.apply(this, arguments);
        return this.action = e.action;
    };
    TitleAction.prototype.serializeData = function() {
        return this.action;
    };
    return TitleAction;
}(Flowdock.ItemView);
