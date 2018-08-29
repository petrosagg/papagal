"use strict";

function r(e) {
    l(e.props.checkedLink == null || e.props.valueLink == null);
}

function o(e) {
    r(e);
    l(e.props.value == null && e.props.onChange == null);
}

function i(e) {
    r(e);
    l(e.props.checked == null && e.props.onChange == null);
}

function s(e) {
    this.props.valueLink.requestChange(e.target.value);
}

function a(e) {
    this.props.checkedLink.requestChange(e.target.checked);
}

var u = require("./ReactPropTypes"), l = require("./invariant"), c = {
    button: true,
    checkbox: true,
    image: true,
    hidden: true,
    radio: true,
    reset: true,
    submit: true
}, p = {
    Mixin: {
        propTypes: {
            value: function(e, t, n) {
                if (!e[t] || c[e.type] || e.onChange || e.readOnly || e.disabled) {
                    return null;
                }
                return new Error("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.");
            },
            checked: function(e, t, n) {
                if (!e[t] || e.onChange || e.readOnly || e.disabled) {
                    return null;
                }
                return new Error("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
            },
            onChange: u.func
        }
    },
    getValue: function(e) {
        if (e.props.valueLink) {
            o(e);
            return e.props.valueLink.value;
        }
        return e.props.value;
    },
    getChecked: function(e) {
        if (e.props.checkedLink) {
            i(e);
            return e.props.checkedLink.value;
        }
        return e.props.checked;
    },
    getOnChange: function(e) {
        if (e.props.valueLink) {
            o(e);
            return s;
        }
        if (e.props.checkedLink) {
            i(e);
            return a;
        }
        return e.props.onChange;
    }
};

module.exports = p;
