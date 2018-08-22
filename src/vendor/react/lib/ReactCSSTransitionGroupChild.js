"use strict";

var r = require("./React"), o = require("./CSSCore"), i = require("./ReactTransitionEvents"), s = require("./onlyChild"), a = (require("./warning"), 
17), u = r.createClass({
    displayName: "ReactCSSTransitionGroupChild",
    transition: function(e, t) {
        var n = this.getDOMNode(), r = this.props.name + "-" + e, s = r + "-active", a = function(e) {
            e && e.target !== n || (o.removeClass(n, r), o.removeClass(n, s), i.removeEndEventListener(n, a), 
            t && t());
        };
        i.addEndEventListener(n, a);
        o.addClass(n, r);
        this.queueClass(s);
    },
    queueClass: function(e) {
        this.classNameQueue.push(e);
        this.timeout || (this.timeout = setTimeout(this.flushClassNameQueue, a));
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
        this.props.appear ? this.transition("appear", e) : e();
    },
    componentWillEnter: function(e) {
        this.props.enter ? this.transition("enter", e) : e();
    },
    componentWillLeave: function(e) {
        this.props.leave ? this.transition("leave", e) : e();
    },
    render: function() {
        return s(this.props.children);
    }
});

module.exports = u;
