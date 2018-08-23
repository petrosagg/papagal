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

Views.Thread.Header = function(e) {
    function Header() {
        return Header.__super__.constructor.apply(this, arguments);
    }
    r(Header, e);
    Header.prototype.initialize = function(e) {
        this.closeButton = this.subview(new Views.Shared.Close({
            stream: e.newMessageStream,
            viewModel: e.viewModel
        }));
        this.title = this.subview(new Views.Thread.Title({
            model: e.message,
            body: e.titleBody
        }));
        this.actions = this.subview(new Views.Thread.Actions({
            model: e.message
        }));
        return Header.__super__.initialize.apply(this, arguments);
    };
    Header.prototype.destructor = function() {
        Header.__super__.destructor.apply(this, arguments);
        return this.closeButton = this.title = this.actions = null;
    };
    return Header;
}(Views.Shared.Header);
