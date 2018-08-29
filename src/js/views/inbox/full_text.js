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

Views.Inbox.FullText = function(t) {
    function FullText() {
        return FullText.__super__.constructor.apply(this, arguments);
    }
    r(FullText, t);
    FullText.prototype.template = require("../../templates/inbox/full_text.mustache");
    FullText.prototype.tagName = "fieldset";
    FullText.prototype.className = "full-text";
    FullText.prototype.events = {
        "click .submit": "submit",
        "blur input": "closeOnEmpty",
        "input input": "closeOnEmpty",
        "keydown input": "onKey"
    };
    FullText.prototype.onAfterRender = function() {
        this.$("input").val(this.query);
        if (this.query) {
            this.$el.show();
        } else {
            this.$el.hide();
        }
        return this;
    };
    FullText.prototype.focus = function() {
        return this.$("input").focus();
    };
    FullText.prototype.setQuery = function(e, t) {
        var n;
        this.query = e;
        this.$("input").val(e);
        n = this.$("input")[0] === document.activeElement;
        this.render();
        if (t || n) {
            return this.focus();
        }
        return;
    };
    FullText.prototype.submit = function(e) {
        var t;
        if (e != null) {
            e.preventDefault()
        };
        t = this.$("input").val();
        if (t.length >= 3) {
            this.setQuery(t, true);
            return this.trigger("search");
        }
        return;
    };
    FullText.prototype.close = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        this.setQuery("");
        return this.trigger("close");
    };
    FullText.prototype.closeOnEmpty = function() {
        if (this.$("input").val()) {
            return undefined;
        }
        return this.close();
    };
    FullText.prototype.onKey = function(e) {
        if (e.which === 13) {
            return this.submit(e);
        }
        return;
    };
    return FullText;
}(Flowdock.ItemView);
