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

Views.Inbox.Header = function(e) {
    function Header() {
        return Header.__super__.constructor.apply(this, arguments);
    }
    r(Header, e);
    Header.prototype.initialize = function(e) {
        var n;
        this.closeButton = this.subview(new Views.Shared.Close());
        this.title = this.subview(new Views.Shared.Title({
            model: e.message,
            body: e.titleBody
        }));
        this.actions = this.subview(new Views.Shared.TitleActions({
            model: e.message,
            actions: (n = e.message.presenter()) != null ? n.actions : void 0
        }));
        return Header.__super__.initialize.apply(this, arguments);
    };
    Header.prototype.destructor = function() {
        Header.__super__.destructor.apply(this, arguments);
        return this.closeButton = this.title = this.actions = null;
    };
    return Header;
}(Views.Shared.Header);
