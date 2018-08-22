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

Views.Shared.TagInput = function(e) {
    function TagInput() {
        return TagInput.__super__.constructor.apply(this, arguments);
    }
    r(TagInput, e);
    TagInput.prototype.tagName = "div";
    TagInput.prototype.className = "tag-input";
    TagInput.prototype.initialize = function(e) {
        return this.options = _.extend({}, e);
    };
    TagInput.prototype.destructor = function() {
        this.clear();
        this.options = null;
        return TagInput.__super__.destructor.apply(this, arguments);
    };
    TagInput.prototype.focus = function() {
        return this.tokenist.focus();
    };
    TagInput.prototype.render = function() {
        this.clear();
        this.autocompleter = this.subview(new Views.MessageAutocompleter({
            maxTags: 5,
            model: this.model
        }));
        this.tokenist = new Views.Shared.Tokenist({
            autocompleter: this.autocompleter,
            tokens: this.model.tags().filter(function(e) {
                return e.humanize() && !e.isAtMention();
            })
        });
        this.listenTo(this.tokenist, "tokenist-blur", function() {
            return this.destructor();
        });
        this.listenTo(this.tokenist, "token-add", function(e) {
            if ((e != null ? e.id : void 0) != null) {
                return this.model.addTags([ e.id ], {
                    user: Flowdock.app.user.id
                });
            }
            return;
        });
        this.listenTo(this.tokenist, "token-remove", function(e) {
            if ((e != null ? e.id : void 0) != null) {
                return this.model.removeTags([ e.id ], {
                    user: Flowdock.app.user.id
                });
            }
            return;
        });
        this.$el.append(this.tokenist.render().el);
        this.fitsAbove() ? (this.$el.prepend(this.autocompleter.render().el), this.$el.addClass(this.options.direction || "n")) : (this.$el.append(this.autocompleter.render().el), 
        this.$el.addClass(this.options.direction || this.options.optionalDirection || "s"));
        this.focus();
        this.$el.on("click", function(e) {
            return e.stopPropagation();
        });
        return this;
    };
    TagInput.prototype.fitsAbove = function() {
        var e, t;
        t = function(e) {
            var n, r;
            n = e.offsetParent();
            if (n.is("body") || n.is("html") || (r = n.css("overflow")) === "hidden" || r === "scroll") {
                return n;
            }
            return t(n);
        };
        e = t(this.$el);
        return this.$el.offset().top - e.offset().top > 280;
    };
    TagInput.prototype.clear = function() {
        var e;
        if ((e = this.tokenist) != null) {
            e.destroy()
        };
        if (this.autocompleter != null) {
            this.removeSubview(this.autocompleter)
        };
        this.tokenist = this.autocompleter = void 0;
        return this.$el.empty();
    };
    return TagInput;
}(Flowdock.HierarchicalView);
