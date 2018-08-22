"use strict";

var r = require("./AutoFocusMixin"), o = require("./ReactBrowserComponentMixin"), i = require("./ReactClass"), s = require("./ReactElement"), a = require("./keyMirror"), u = s.createFactory("button"), l = a({
    onClick: !0,
    onDoubleClick: !0,
    onMouseDown: !0,
    onMouseMove: !0,
    onMouseUp: !0,
    onClickCapture: !0,
    onDoubleClickCapture: !0,
    onMouseDownCapture: !0,
    onMouseMoveCapture: !0,
    onMouseUpCapture: !0
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
