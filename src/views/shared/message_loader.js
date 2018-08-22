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

Views.Shared.MessageLoader = function(t) {
    function MessageLoader() {
        this.inView = r(this.inView, this);
        this.onInview = r(this.onInview, this);
        return MessageLoader.__super__.constructor.apply(this, arguments);
    }
    o(MessageLoader, t);
    MessageLoader.prototype.tagName = "a";
    MessageLoader.prototype.className = "message-loader";
    MessageLoader.prototype.events = {
        click: "onClick"
    };
    MessageLoader.prototype.templates = {
        error: require("../../templates/chat/notifications/error.mustache"),
        loading: require("../../templates/chat/notifications/loading.mustache"),
        message_pending: require("../../templates/chat/notifications/message_pending.mustache"),
        more: require("../../templates/chat/notifications/more.mustache")
    };
    MessageLoader.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.direction = e.direction || "backward";
        this.current = "more";
        this.noInview = e.noInview;
        return this.firstLoad = new $.Deferred();
    };
    MessageLoader.prototype.onInview = function() {
        if (this.current === "error" || this.noInview) {
            return void 0;
        }
        return this.more();
    };
    MessageLoader.prototype.template = function(t) {
        return this.templates[t].render({}, {
            spinner: require("../../templates/spinner.mustache")
        });
    };
    MessageLoader.prototype.onClick = function(e) {
        var t;
        if ((t = this.current) === "error" || t === "more") {
            this.more()
        };
        return e.preventDefault();
    };
    MessageLoader.prototype.state = function(e) {
        this.current = e;
        this.trigger("state", this.current);
        if (e === "more" && this.blockSuccessRenderingChange) {
            return void 0;
        }
        return this.render();
    };
    MessageLoader.prototype.inView = function(e, t) {
        var n;
        if ((n = this.triggerElement) != null) {
            n.scrollableInview("destroy")
        };
        this.triggerElement = null;
        if (e != null && 0 !== e.length) {
            this.triggerElement = $(e);
            return this.bindElement(this.triggerElement, t);
        }
        return;
    };
    MessageLoader.prototype.more = function(e) {
        var t;
        if ("loading" !== this.current) {
            this.state("loading");
            t = {
                direction: this.direction,
                timeout: 1e4,
                error: function(e) {
                    return function() {
                        e.state("error");
                        return e.firstLoad.reject();
                    };
                }(this),
                success: function(e) {
                    return function() {
                        e.state("more");
                        return e.firstLoad.resolve();
                    };
                }(this),
                finish: function() {
                    if (typeof e == "function") {
                        return e();
                    }
                    return;
                }
            };
            return this.collection.fetchHistory(t);
        }
    };
    MessageLoader.prototype.bindElement = function(e, t) {
        e.scrollableInview("remove", this.onInview);
        return e.scrollableInview({
            onInview: this.onInview,
            scrollParent: t,
            fully: !1
        });
    };
    MessageLoader.prototype.detach = function() {
        return this.$el.detach();
    };
    MessageLoader.prototype.render = function() {
        this.$el.empty();
        this.$el.attr("href", "#").html(this.template(this.current));
        this.$el.removeClass("loading more error").addClass(this.current);
        _.defer(function(e) {
            return function() {
                var t;
                t = e.$el.closest(".scrollable");
                if (t.length === 0) {
                    t = e.$el.closest("ul")
                };
                if (t.length === 0) {
                    t = e.$el.closest("article")
                };
                return e.bindElement(e.$el, t);
            };
        }(this));
        return this;
    };
    MessageLoader.prototype.remove = function() {
        var e;
        this.$el.scrollableInview("destroy");
        if ((e = this.triggerElement) != null) {
            e.scrollableInview("destroy")
        };
        this.triggerElement = null;
        return MessageLoader.__super__.remove.apply(this, arguments);
    };
    return MessageLoader;
}(Backbone.View);