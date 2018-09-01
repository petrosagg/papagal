var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

Views.Embed.Embeddable = function(e) {
    function Embeddable() {
        this.deferredLoad = r(this.deferredLoad, this);
        this.onMuteChange = r(this.onMuteChange, this);
        return Embeddable.__super__.constructor.apply(this, arguments);
    }
    o(Embeddable, e);
    Embeddable.TIMEOUT = 8e3;
    Embeddable.prototype.events = {
        "click .embed-hide-btn": function(e) {
            return e.preventDefault();
        }
    };
    Embeddable.prototype.initialize = function(e) {
        this.loaded = false;
        this.$el.append('<i class="embed-show-btn fa fa-eye fa-lg" title="Show preview"/>');
        this.original = this.$el.html();
        this.parent = e.parent;
        this._embedded = null;
        this.message = e.message;
        this.containedNSFWContent = false;
        this.previewManuallyToggled = false;
        if (this.message != null) {
            this.listenTo(this.message, "change", this.messageChanged)
        };
        this.muteUnsubscriber = Bacon.mergeAll([ this.$el.asEventStream("click", ".embed-hide-btn").map(false), this.$el.asEventStream("click", ".embed-show-btn").map(true), Flowdock.app.preferences.asEventStream("change:link_previews").map(function(e) {
            return e.linkPreviews();
        }) ]).onValue(this.onMuteChange);
        if (Flowdock.app.preferences.linkPreviews()) {
            return this.bindInview();
        }
        return;
    };
    Embeddable.prototype.embed = function(e) {
        if (e !== undefined) {
            this._embedded = e
        };
        return this._embedded;
    };
    Embeddable.prototype.messageChanged = function() {
        if (this.message.containsNSFWContent() && !this.containedNSFWContent) {
            this.containedNSFWContent = true;
            return this.hideEmbed();
        }
        return;
    };
    Embeddable.prototype.render = function() {
        if (this._embedded != null) {
            this.renderPreview(Flowdock.app.preferences.linkPreviews());
        } else {
            this.$el.addClass("no-embed");
        }
        return this;
    };
    Embeddable.prototype.renderPreview = function(e) {
        if (e) {
            this.$el.addClass((this.type || "embedded") + "-preview");
            if (!this.previewManuallyToggled && this.message.containsNSFWContent()) {
                return this.hideEmbed();
            }
            return this.showEmbed();
        }
        return this.hideEmbed();
    };
    Embeddable.prototype.hideEmbed = function() {
        return this.parent.preserveScrolling(function(e) {
            return function() {
                if (e._isReactElement()) {
                    e.destroyComponents()
                };
                e.$el.addClass("no-embed");
                return e.$el.html(e.original);
            };
        }(this));
    };
    Embeddable.prototype.showEmbed = function() {
        var e;
        e = this.$("a").first().empty();
        return this.parent.preserveScrolling(function(t) {
            return function() {
                var n, r;
                t.$el.removeClass("no-embed");
                if (t._isReactElement()) {
                    t.destroyComponents();
                    t.component(e[0], t._embedded);
                } else {
                    e.append(t._embedded);
                }
                r = [ '<i class="fa fa-circle fa-stack-2x"></i>', '<i class="fa fa-times fa-stack-1x fa-inverse" title="Hide preview"/>' ];
                n = '<span class="fa-stack">' + r.join() + "</span>";
                return t.$("a.external").first().append('<div class="embed-hide-btn">' + n + "</div>");
            };
        }(this));
    };
    Embeddable.prototype.onMuteChange = function(e) {
        this.previewManuallyToggled = true;
        if (this._embedded) {
            return this.renderPreview(e);
        }
        if (e) {
            return this.bindInview();
        }
        return this.$el.scrollableInview("destroy");
    };
    Embeddable.prototype.bindInview = function() {
        if (this._embedded !== false) {
            return _.defer(function(e) {
                return function() {
                    e.addStream(e.parentScrollState().onValue(function() {}));
                    return e.$el.scrollableInview({
                        fully: false,
                        scrollParent: e.scrollParent(),
                        onInview: e.deferredLoad
                    });
                };
            }(this));
        }
        return;
    };
    Embeddable.prototype.scrollParent = function() {
        var e;
        e = this.$el.closest("ul");
        if (e.length === 0) {
            e = this.$el.closest("article")
        };
        return e;
    };
    Embeddable.prototype.parentScrollState = function() {
        this._scrollState || (this._scrollState = this.scrollParent().asEventStream("scroll").debounceImmediate(500).flatMapLatest(function() {
            return Bacon.once(true).merge(Bacon.once(false).delay(550));
        }).skipDuplicates().toProperty(false));
        return this._scrollState;
    };
    Embeddable.prototype.deferredLoad = function() {
        return this.addStream(this.parentScrollState().filter(function(e) {
            return !e;
        }).take(1).onValue(function(e) {
            return function() {
                return e.load();
            };
        }(this)));
    };
    Embeddable.prototype.destructor = function() {
        Embeddable.__super__.destructor.apply(this, arguments);
        this.muteUnsubscriber();
        this.$el.scrollableInview("destroy");
        return this.original = this.parent = this._embedded = this.muteUnsubscriber = this._scrollState = this.message = null;
    };
    Embeddable.prototype._isReactElement = function() {
        return React.isValidElement(this._embedded);
    };
    Embeddable.prototype.shouldLoad = function() {
        if (Flowdock.app.preferences.linkPreviews()) {
            return this.firstLoad();
        }
        return false;
    };
    Embeddable.prototype.firstLoad = function() {
        if (this.loaded) {
            return false;
        }
        this.loaded = true;
        return true;
    };
    return Embeddable;
}(Flowdock.HierarchicalView);

require("./document");

require("./gfycat");

require("./image");

require("./spotify");

require("./twitter");

require("./vimeo");

require("./youtube");

require("./gifv");

require("./github");
