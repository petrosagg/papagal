"use strict";

var r = require("./React"), o = require("./CSSCore"), i = require("./ReactTransitionEvents"), s = require("./onlyChild"), a = (require("./warning"), 
17), u = r.createClass({
    displayName: "ReactCSSTransitionGroupChild",
    transition: function(e, t) {
        var n = this.getDOMNode(), r = this.props.name + "-" + e, s = r + "-active", a = function(e) {
            if (!(e && e.target !== n)) {
                o.removeClass(n, r), o.removeClass(n, s), i.removeEndEventListener(n, a), t && t()
            };
        };
        i.addEndEventListener(n, a);
        o.addClass(n, r);
        this.queueClass(s);
    },
    queueClass: function(e) {
        this.classNameQueue.push(e);
        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, a)
        };
    },
    flushClassNameQueue: function() {
        if (this.isMounted()) {
            this.classNameQueue.forEach(o.addClass.bind(o, this.getDOMNode()))
        };
        this.classNameQueue.length = 0;
        this.timeout = null;
    },
    componentWillMount: function() {
        this.classNameQueue = [];
    },
    componentWillUnmount: function() {
        if (this.timeout) {
            clearTimeout(this.timeout)
        };
    },
    componentWillAppear: function(e) {
        if (this.props.appear) {
            this.transition("appear", e);
        } else {
            e();
        }
    },
    componentWillEnter: function(e) {
        if (this.props.enter) {
            this.transition("enter", e);
        } else {
            e();
        }
    },
    componentWillLeave: function(e) {
        if (this.props.leave) {
            this.transition("leave", e);
        } else {
            e();
        }
    },
    render: function() {
        return s(this.props.children);
    }
});

module.exports = u;
