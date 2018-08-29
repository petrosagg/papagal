var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

r = function() {
    function t(e, t) {
        this.model = e.model;
        this.onComplete = t;
        this._onWalkthroughStop = o(this._onWalkthroughStop, this);
        this._onWalkthroughNotNow = o(this._onWalkthroughNotNow, this);
        this._openNextTooltip = o(this._openNextTooltip, this);
        this._showNextCoachMark = o(this._showNextCoachMark, this);
        this.skip = o(this.skip, this);
        this.stop = o(this.stop, this);
        this._steps = [];
        this._components = [];
        this._cleanups = [];
    }
    t.prototype.addStep = function(e) {
        return this._steps.push(e);
    };
    t.prototype.start = function() {
        return this._showNextCoachMark();
    };
    t.prototype.pause = function() {
        return this._showAllCoachMarks();
    };
    t.prototype.unmount = function() {
        var e, t, n, r;
        for (r = this._components, t = 0, n = r.length; n > t; t++) {
            e = r[t];
            e.finish();
        }
        delete this._components;
        delete this._steps;
        return this.model;
    };
    t.prototype.stop = function() {
        this.unmount();
        return this.model.complete().done(function(e) {
            return function() {
                return e.onComplete();
            };
        }(this));
    };
    t.prototype.skip = function() {
        this.unmount();
        return this.model.skip().done(function(e) {
            return function() {
                return e.onComplete();
            };
        }(this));
    };
    t.prototype.hasTasks = function() {
        return this._steps.length > 0;
    };
    t.prototype._createContainer = function(e) {
        var t;
        t = $("<div>").addClass("tutorial-tooltip-container");
        e.prepend(t);
        return t[0];
    };
    t.prototype._renderCoachMarkWithTooltip = function(e) {
        _.extend(e, {
            onSuccess: e.onSuccess,
            onSkip: e.onSkip,
            onDone: this._onStepDone,
            onBeforeDone: this._showNextCoachMark,
            onStop: this._onWalkthroughNotNow
        });
        this.hasTasks() || _.extend(e, {
            skipPrompt: "Finish",
            stopPrompt: null
        });
        return this._renderCoachMark(e);
    };
    t.prototype._renderCoachMarkWithoutTooltip = function(e) {
        var t, n;
        _.extend(e, {
            tooltipVisible: !1,
            onSuccess: e.onSuccess,
            onSkip: e.onSkip,
            onDone: function(e) {
                return function(t, r) {
                    e._onStepDone(t, r);
                    return n();
                };
            }(this),
            onBeforeDone: this._openNextTooltip,
            onStop: this._onWalkthroughStop,
            stopPrompt: "Don't show these."
        });
        t = this._renderCoachMark(e);
        n = e.actionTarget.asEventStream("click").onValue(function(e) {
            return function(n) {
                if (t.state.tooltipVisible) {
                    return void 0;
                }
                n.preventDefault();
                n.stopImmediatePropagation();
                return e._openTooltipFor(t);
            };
        }(this));
        return t;
    };
    t.prototype._renderCoachMark = function(t) {
        var n, r;
        r = this._createContainer(t.target);
        n = React.createFactory(require("components/tutorial/coach_mark"));
        return React.render(n(t), r);
    };
    t.prototype._showNextCoachMark = function(e, t) {
        var n;
        if (e) {
            this._removeComponent(e)
        };
        if (this.hasTasks()) {
            n = this._steps.pop();
            if (typeof n.shouldSkip == "function" && n.shouldSkip()) {
                return void this._showNextCoachMark();
            }
            return this._addComponent(this._renderCoachMarkWithTooltip(n));
        }
        return void this.stop();
    };
    t.prototype._showAllCoachMarks = function() {
        var e, t, n, r, o;
        for (n = this._steps, r = [], e = 0, t = n.length; t > e; e++) {
            o = n[e];
            if (typeof o.shouldSkip == "function" && o.shouldSkip()) {
                r.push(void 0);
            } else r.push(this._components.push(this._renderCoachMarkWithoutTooltip(o)));
        }
        return r;
    };
    t.prototype._openNextTooltip = function(e, t) {
        this._removeComponent(e);
        if (this._components.length === 0) {
            return void this.stop();
        }
        return this._openTooltipFor(this._components[this._components.length - 1]);
    };
    t.prototype._openTooltipFor = function(e) {
        var t, n, r, o;
        for (o = this._components, n = 0, r = o.length; r > n; n++) {
            t = o[n];
            t.toggleTooltip(!1);
        }
        if (this._components.length === 1) {
            e.setProps({
                skipPrompt: "Finish",
                stopPrompt: null
            })
        };
        return e.toggleTooltip(!0);
    };
    t.prototype._addComponent = function(e) {
        return this._components.push(e);
    };
    t.prototype._removeComponent = function(e) {
        return this._components.splice(this._components.indexOf(e), 1);
    };
    t.prototype._onStepDone = function(e, t) {
        var n, r;
        r = e.getDOMNode();
        n = r.parentNode;
        React.unmountComponentAtNode(r);
        return n.parentNode.removeChild(n);
    };
    t.prototype._onWalkthroughNotNow = function(e, t) {
        this._removeComponent(e);
        return this._showAllCoachMarks();
    };
    t.prototype._onWalkthroughStop = function(e, t) {
        this._removeComponent(e);
        return this.skip();
    };
    return t;
}();

module.exports = r;
