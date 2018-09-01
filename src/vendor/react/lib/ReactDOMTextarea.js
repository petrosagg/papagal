"use strict";

function r() {
    if (this.isMounted()) {
        this.forceUpdate()
    };
}

var o = require("./AutoFocusMixin"), i = require("./DOMPropertyOperations"), s = require("./LinkedValueUtils"), a = require("./ReactBrowserComponentMixin"), u = require("./ReactClass"), l = require("./ReactElement"), c = require("./ReactUpdates"), p = require("./Object.assign"), d = require("./invariant"), h = (require("./warning"), 
l.createFactory("textarea")), f = u.createClass({
    displayName: "ReactDOMTextarea",
    tagName: "TEXTAREA",
    mixins: [ o, s.Mixin, a ],
    getInitialState: function() {
        var e = this.props.defaultValue, t = this.props.children;
        if (t != null) {
            d(e == null);
            if (Array.isArray(t)) {
                d(t.length <= 1);
                t = t[0];
            };
            e = "" + t;
        };
        if (e == null) {
            e = ""
        };
        var n = s.getValue(this);
        return {
            initialValue: "" + (n != null ? n : e)
        };
    },
    render: function() {
        var e = p({}, this.props);
        d(e.dangerouslySetInnerHTML == null);
        e.defaultValue = null;
        e.value = null;
        e.onChange = this._handleChange;
        return h(e, this.state.initialValue);
    },
    componentDidUpdate: function(e, t, n) {
        var r = s.getValue(this);
        if (r != null) {
            var o = this.getDOMNode();
            i.setValueForProperty(o, "value", "" + r);
        }
    },
    _handleChange: function(e) {
        var t, n = s.getOnChange(this);
        if (n) {
            t = n.call(this, e)
        };
        c.asap(r, this);
        return t;
    }
});

module.exports = f;
