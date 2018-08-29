"use strict";

function r() {
    if (this._pendingUpdate) {
        this._pendingUpdate = false;
        var e = a.getValue(this);
        if (e != null && this.isMounted()) {
            i(this, e)
        };
    }
}

function o(e, t, n) {
    if (e[t] == null) {
        return null;
    }
    if (e.multiple) {
        if (!Array.isArray(e[t])) {
            return new Error("The `" + t + "` prop supplied to <select> must be an array if `multiple` is true.");
        }
    } else if (Array.isArray(e[t])) {
        return new Error("The `" + t + "` prop supplied to <select> must be a scalar value if `multiple` is false.");
    }
}

function i(e, t) {
    var n, r, o, i = e.getDOMNode().options;
    if (e.props.multiple) {
        for (n = {}, r = 0, o = t.length; o > r; r++) {
            n["" + t[r]] = true;
        }
        for (r = 0, o = i.length; o > r; r++) {
            var s = n.hasOwnProperty(i[r].value);
            if (i[r].selected !== s) {
                i[r].selected = s
            };
        }
    } else {
        for (n = "" + t, r = 0, o = i.length; o > r; r++) {
            if (i[r].value === n) {
                return void (i[r].selected = true);
            }
        }
        if (i.length) {
            i[0].selected = true
        };
    }
}

var s = require("./AutoFocusMixin"), a = require("./LinkedValueUtils"), u = require("./ReactBrowserComponentMixin"), l = require("./ReactClass"), c = require("./ReactElement"), p = require("./ReactUpdates"), d = require("./Object.assign"), h = c.createFactory("select"), f = l.createClass({
    displayName: "ReactDOMSelect",
    tagName: "SELECT",
    mixins: [ s, a.Mixin, u ],
    propTypes: {
        defaultValue: o,
        value: o
    },
    render: function() {
        var e = d({}, this.props);
        e.onChange = this._handleChange;
        e.value = null;
        return h(e, this.props.children);
    },
    componentWillMount: function() {
        this._pendingUpdate = false;
    },
    componentDidMount: function() {
        var e = a.getValue(this);
        if (e != null) {
            i(this, e);
        } else {
            if (this.props.defaultValue != null) {
                i(this, this.props.defaultValue)
            };
        }
    },
    componentDidUpdate: function(e) {
        var t = a.getValue(this);
        if (t != null) {
            this._pendingUpdate = false;
            i(this, t);
        } else {
            if (!e.multiple != !this.props.multiple) {
                this.props.defaultValue != null ? i(this, this.props.defaultValue) : i(this, this.props.multiple ? [] : "")
            };
        }
    },
    _handleChange: function(e) {
        var t, n = a.getOnChange(this);
        if (n) {
            t = n.call(this, e)
        };
        this._pendingUpdate = true;
        p.asap(r, this);
        return t;
    }
});

module.exports = f;
