"use strict";

var r = require("./React"), o = require("./Object.assign"), i = r.createFactory(require("./ReactTransitionGroup")), s = r.createFactory(require("./ReactCSSTransitionGroupChild")), a = r.createClass({
    displayName: "ReactCSSTransitionGroup",
    propTypes: {
        transitionName: r.PropTypes.string.isRequired,
        transitionAppear: r.PropTypes.bool,
        transitionEnter: r.PropTypes.bool,
        transitionLeave: r.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            transitionAppear: false,
            transitionEnter: true,
            transitionLeave: true
        };
    },
    _wrapChild: function(e) {
        return s({
            name: this.props.transitionName,
            appear: this.props.transitionAppear,
            enter: this.props.transitionEnter,
            leave: this.props.transitionLeave
        }, e);
    },
    render: function() {
        return i(o({}, this.props, {
            childFactory: this._wrapChild
        }));
    }
});

module.exports = a;
