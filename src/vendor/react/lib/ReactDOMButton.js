"use strict";

var r = require("./AutoFocusMixin"), o = require("./ReactBrowserComponentMixin"), i = require("./ReactClass"), s = require("./ReactElement"), a = require("./keyMirror"), u = s.createFactory("button"), l = a({
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
}), c = i.createClass({
    displayName: "ReactDOMButton",
    tagName: "BUTTON",
    mixins: [ r, o ],
    render: function() {
        var e = {};
        for (var t in this.props) {
            !this.props.hasOwnProperty(t) || this.props.disabled && l[t] || (e[t] = this.props[t]);
        }
        return u(e, this.props.children);
    }
});

module.exports = c;
