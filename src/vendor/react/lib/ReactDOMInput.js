"use strict";

function r() {
    if (this.isMounted()) {
        this.forceUpdate()
    };
}

var o = require("./AutoFocusMixin"), i = require("./DOMPropertyOperations"), s = require("./LinkedValueUtils"), a = require("./ReactBrowserComponentMixin"), u = require("./ReactClass"), l = require("./ReactElement"), c = require("./ReactMount"), p = require("./ReactUpdates"), d = require("./Object.assign"), h = require("./invariant"), f = l.createFactory("input"), m = {}, g = u.createClass({
    displayName: "ReactDOMInput",
    tagName: "INPUT",
    mixins: [ o, s.Mixin, a ],
    getInitialState: function() {
        var e = this.props.defaultValue;
        return {
            initialChecked: this.props.defaultChecked || false,
            initialValue: e != null ? e : null
        };
    },
    render: function() {
        var e = d({}, this.props);
        e.defaultChecked = null;
        e.defaultValue = null;
        var t = s.getValue(this);
        e.value = t != null ? t : this.state.initialValue;
        var n = s.getChecked(this);
        e.checked = n != null ? n : this.state.initialChecked;
        e.onChange = this._handleChange;
        return f(e, this.props.children);
    },
    componentDidMount: function() {
        var e = c.getID(this.getDOMNode());
        m[e] = this;
    },
    componentWillUnmount: function() {
        var e = this.getDOMNode(), t = c.getID(e);
        delete m[t];
    },
    componentDidUpdate: function(e, t, n) {
        var r = this.getDOMNode();
        if (this.props.checked != null) {
            i.setValueForProperty(r, "checked", this.props.checked || false)
        };
        var o = s.getValue(this);
        if (o != null) {
            i.setValueForProperty(r, "value", "" + o)
        };
    },
    _handleChange: function(e) {
        var t, n = s.getOnChange(this);
        if (n) {
            t = n.call(this, e)
        };
        p.asap(r, this);
        var o = this.props.name;
        if (this.props.type === "radio" && o != null) {
            for (var i = this.getDOMNode(), a = i; a.parentNode; ) {
                a = a.parentNode;
            }
            for (var u = a.querySelectorAll("input[name=" + JSON.stringify("" + o) + '][type="radio"]'), l = 0, d = u.length; d > l; l++) {
                var f = u[l];
                if (f !== i && f.form === i.form) {
                    var g = c.getID(f);
                    h(g);
                    var v = m[g];
                    h(v);
                    p.asap(r, v);
                }
            }
        }
        return t;
    }
});

module.exports = g;
