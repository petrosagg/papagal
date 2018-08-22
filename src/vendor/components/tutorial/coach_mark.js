var r, o, i, s, a, u, l, c;

l = React.DOM;

s = l.div;

u = l.p;

o = l.a;

a = l.i;

c = l.span;

i = require("classnames");

r = React.createFactory(React.addons.CSSTransitionGroup);

module.exports = React.createClass({
    displayName: "CoachMark",
    getInitialState: function() {
        return {
            visible: !0,
            success: !1,
            currentStep: 0,
            markerVisible: !0,
            tooltipVisible: this.props.tooltipVisible
        };
    },
    getDefaultProps: function() {
        return {
            autoContinue: !1,
            tooltipVisible: !0,
            markerVisible: function() {
                return Bacon.constant(!0);
            },
            delay: 0,
            success: null,
            onSuccess: function() {},
            onBeforeDone: function() {},
            onDone: function() {},
            onStop: function() {},
            onSkip: function() {},
            unsubscribers: [],
            skipPrompt: "Next",
            stopPrompt: "Not right now."
        };
    },
    componentDidMount: function() {
        this.unsubscribers = [];
        this.unsubscribers.push(this.props.success().onValue(this.onSuccess));
        this.unsubscribers.push(this.props.markerVisible().onValue(function(e) {
            return function(t) {
                return e.update({
                    markerVisible: t
                });
            };
        }(this)));
        if (this.props.currentStep) {
            return this.unsubscribers.push(this.props.currentStep().onValue(function(e) {
                return function(t) {
                    return e.update({
                        currentStep: t
                    });
                };
            }(this)));
        }
        return;
    },
    componentWillUnmount: function() {
        var e, t, n, r;
        for (n = this.unsubscribers, e = 0, t = n.length; t > e; e++) {
            (r = n[e])();
        }
        return delete this.unsubscribers;
    },
    render: function() {
        var e, t, n, a;
        a = i({
            "coach-mark-wrapper": !0,
            "coach-mark-success": this.state.success
        });
        a += " coach-mark-step-" + this.state.currentStep;
        e = i({
            "coach-tooltip-content": !0,
            in: this.state.success
        });
        t = this.state.success ? this.props.task.successStep : this.props.task.steps[this.state.currentStep];
        n = this.state.success ? this.succeed : this.skip;
        return s({
            key: 1,
            className: a
        }, this.state.markerVisible ? s({
            className: "coach-mark",
            id: this.props.task.name + "-mark"
        }) : void 0, r({
            transitionName: "coach-tooltip"
        }, this.state.tooltipVisible ? s({
            key: 1,
            ref: "tooltip",
            className: "coach-tooltip",
            id: this.props.task.name + "-tip"
        }, s({
            className: "coach-tooltip-content-wrapper"
        }, s({
            className: e
        }, s({
            className: "coach-tooltip-title"
        }, t.title), s({
            className: "coach-tooltip-description"
        }, t.description))), this.state.success && this.props.autoContinue ? void 0 : s({
            className: "coach-tooltip-footer"
        }, o({
            className: "coach-tooltip-next",
            onClick: n
        }, this.props.skipPrompt), this.props.stopPrompt != null ? o({
            className: "coach-tooltip-stop",
            onClick: this.stop
        }, this.props.stopPrompt) : void 0)) : []));
    },
    stop: function() {
        this.props.onSkip(this, this.props.task);
        return this.close(this.props.onStop, this.props.onDone);
    },
    succeed: function() {
        this.props.onSuccess(this, this.props.task);
        return this.close();
    },
    skip: function() {
        this.props.onSkip(this, this.props.task);
        return this.close();
    },
    close: function(e, t) {
        if (e == null) {
            e = this.props.onBeforeDone
        };
        if (t == null) {
            t = this.props.onDone
        };
        this.setState({
            tooltipVisible: !1
        });
        return this.onAnimation(e, t);
    },
    finish: function() {
        return this.props.onDone(this, this.props.task);
    },
    getElement: function() {
        return $(this.getDOMNode());
    },
    onAnimation: function(e, t) {
        var n;
        n = this.getElement();
        n.one(Helpers.animationend(), function(e) {
            return function() {
                return t(e, e.props.task);
            };
        }(this));
        return e(this, this.props.task);
    },
    onSuccess: function() {
        var e;
        if (this.props.task.successStep) {
            e = this.getElement().find(".coach-tooltip-content");
            e.addClass("out");
            return e.one(Helpers.animationend(), function(e) {
                return function() {
                    e.setState({
                        success: !0
                    });
                    if (e.props.autoContinue) {
                        e.props.onSuccess(e, e.props.task);
                        return setTimeout(function() {
                            e.setState({
                                tooltipVisible: !1
                            });
                            return e.onAnimation(e.props.onBeforeDone, e.props.onDone);
                        }, 3e3);
                    }
                    return;
                };
            }(this));
        }
        return;
    },
    update: function(e) {
        return this.setState(e);
    },
    toggleTooltip: function(e) {
        return this.setState({
            tooltipVisible: e
        });
    },
    positionAtNode: function(e, t) {
        var n, r, o, i;
        if (e != null) {
            n = e.getBoundingClientRect();
            i = this.refs.tooltip.getDOMNode();
            r = $("#tab-bar").outerWidth();
            o = n.right - n.left;
            i.style.top = n[t] + "px";
            return i.style.left = n.right - r - .5 * o + "px";
        }
    }
});
