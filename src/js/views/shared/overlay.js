var r, o = function(e, t) {
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

r = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    o(n, t);
    n.prototype.tagName = "article";
    n.prototype.className = "stripe";
    n.prototype.initialize = function(t) {
        if (t == null) {
            t = {}
        };
        this.attached = false;
        this.target = t.target;
        if (t.removeOnHide != null) {
            this.removeOnHide = t.removeOnHide;
        } else {
            this.removeOnHide = true;
        }
        if (t.loader) {
            this.loader = new Views.Shared.Progress()
        };
        this.error = $("<div>").addClass("inline-error");
        this.topAligned = t.topAligned;
        this.closeButton = $(require("../../templates/overlays/close_button.mustache").render());
        if (t.type != null) {
            this.className = t.type;
            return this.$el.attr("class", this.className);
        }
        return;
    };
    n.prototype.destructor = function() {
        if (this.target) {
            this.unbind()
        };
        n.__super__.destructor.apply(this, arguments);
        return this.loader = this.target = this.closeButton = undefined;
    };
    n.prototype.attach = function() {
        if (this.target && !this.attached) {
            if (this.$el.is(":empty")) {
                this._render()
            };
            this.target.append(this.mask);
            this.target.append(this.container);
            this.bind();
            this.attached = true;
            return this;
        }
        return;
    };
    n.prototype.detach = function() {
        if (this.attached) {
            this.unbind();
            this.mask.detach();
            this.container.detach();
            return this.attached = false;
        }
        return;
    };
    n.prototype.close = function() {
        $(".tipsy").remove();
        if (this.removeOnHide) {
            this.destructor();
            if (this.attached) {
                this.mask.remove();
                this.container.remove();
            };
        } else {
            this.detach();
        }
        return this.trigger("close");
    };
    n.prototype.enableDialogDismissal = function() {
        this.cannotClose = false;
        this.$(".close-overlay").removeClass("hidden").show();
        return this.closeButton.show();
    };
    n.prototype.disableDialogDismissal = function() {
        this.cannotClose = true;
        this.$(".close-overlay").addClass("hidden").hide();
        return this.closeButton.hide();
    };
    n.prototype.clickHandler = function(e, t) {
        if (this.cannotClose) {
            return undefined;
        }
        if ($(e.target).parent().is(".overlay-wrapper, .fa-stack")) {
            return this.close();
        }
        return;
    };
    n.prototype.keyHandler = function(e) {
        if (this.cannotClose || $(e.target).is("textarea, select, .tokenist") || $(e.target).is("input") && $(e.target)[0].className !== "spotlight-search-input") {
            return undefined;
        }
        if (KeyEvent.is("esc")(e)) {
            return this.close();
        }
        return;
    };
    n.prototype.bind = function() {
        var e;
        this.target.on("keydown.overlay" + this.cid, this.keyHandler.bind(this));
        this.target.on("click.overlay" + this.cid, this.clickHandler.bind(this));
        if ((e = this.mask) != null) {
            return e.on("click.overlay" + this.cid, ".close-overlay", this.close.bind(this));
        }
        return;
    };
    n.prototype.unbind = function() {
        var e;
        this.target.off(".overlay" + this.cid);
        if ((e = this.mask) != null) {
            return e.off(".overlay" + this.cid);
        }
        return;
    };
    n.prototype.navigateToFlow = function() {
        var e;
        e = Flowdock.app.manager.currentFlow;
        if (e != null) {
            return Flowdock.app.router.navigateBackToFlow(e, {
                trigger: false
            });
        }
        return Flowdock.app.router.activateFirst();
    };
    n.prototype.showError = function(e) {
        var t;
        this.error.html(e);
        this.error.show().addClass("pushin");
        t = function(e) {
            return function() {
                return e.error.hide().removeClass("pushin");
            };
        }(this);
        return setTimeout(t, 3e3);
    };
    n.prototype.render = function() {
        return this;
    };
    n.prototype.removeLoader = function() {
        this.loader.remove();
        return this.loader = null;
    };
    n.prototype._render = function() {
        var e, t, n;
        this.mask = $("<div>").addClass("overlay-mask");
        this.container = $("<div>").addClass("overlay-container");
        n = $("<div>").addClass("overlay-wrapper");
        if (this.topAligned) {
            t = "top-aligned-overlay-content";
        } else {
            t = "overlay-content";
        }
        e = $("<div>").addClass(t);
        e.append(this.render().el);
        if (this.loader) {
            e.append(this.loader.render().el)
        };
        n.append(e, this.closeButton);
        this.container.append(n);
        return this.$el.append(this.error.hide());
    };
    return n;
}(Flowdock.HierarchicalView);

module.exports = r;
