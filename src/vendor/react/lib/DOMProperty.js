"use strict";

function r(e, t) {
    return (e & t) === t;
}

var o = require("./invariant"), i = {
    MUST_USE_ATTRIBUTE: 1,
    MUST_USE_PROPERTY: 2,
    HAS_SIDE_EFFECTS: 4,
    HAS_BOOLEAN_VALUE: 8,
    HAS_NUMERIC_VALUE: 16,
    HAS_POSITIVE_NUMERIC_VALUE: 48,
    HAS_OVERLOADED_BOOLEAN_VALUE: 64,
    injectDOMPropertyConfig: function(e) {
        var t = e.Properties || {}, n = e.DOMAttributeNames || {}, s = e.DOMPropertyNames || {}, u = e.DOMMutationMethods || {};
        if (e.isCustomAttribute) {
            a._isCustomAttributeFunctions.push(e.isCustomAttribute)
        };
        for (var l in t) {
            o(!a.isStandardName.hasOwnProperty(l));
            a.isStandardName[l] = !0;
            var c = l.toLowerCase();
            a.getPossibleStandardName[c] = l
            if (n.hasOwnProperty(l)) {
                var p = n[l];
                a.getPossibleStandardName[p] = l;
                a.getAttributeName[l] = p;
            } else a.getAttributeName[l] = c;
            a.getPropertyName[l] = s.hasOwnProperty(l) ? s[l] : l;
            u.hasOwnProperty(l) ? a.getMutationMethod[l] = u[l] : a.getMutationMethod[l] = null;
            var d = t[l];
            a.mustUseAttribute[l] = r(d, i.MUST_USE_ATTRIBUTE);
            a.mustUseProperty[l] = r(d, i.MUST_USE_PROPERTY);
            a.hasSideEffects[l] = r(d, i.HAS_SIDE_EFFECTS);
            a.hasBooleanValue[l] = r(d, i.HAS_BOOLEAN_VALUE);
            a.hasNumericValue[l] = r(d, i.HAS_NUMERIC_VALUE);
            a.hasPositiveNumericValue[l] = r(d, i.HAS_POSITIVE_NUMERIC_VALUE);
            a.hasOverloadedBooleanValue[l] = r(d, i.HAS_OVERLOADED_BOOLEAN_VALUE);
            o(!a.mustUseAttribute[l] || !a.mustUseProperty[l]);
            o(a.mustUseProperty[l] || !a.hasSideEffects[l]);
            o(!!a.hasBooleanValue[l] + !!a.hasNumericValue[l] + !!a.hasOverloadedBooleanValue[l] <= 1);
        }
    }
}, s = {}, a = {
    ID_ATTRIBUTE_NAME: "data-reactid",
    isStandardName: {},
    getPossibleStandardName: {},
    getAttributeName: {},
    getPropertyName: {},
    getMutationMethod: {},
    mustUseAttribute: {},
    mustUseProperty: {},
    hasSideEffects: {},
    hasBooleanValue: {},
    hasNumericValue: {},
    hasPositiveNumericValue: {},
    hasOverloadedBooleanValue: {},
    _isCustomAttributeFunctions: [],
    isCustomAttribute: function(e) {
        for (var t = 0; t < a._isCustomAttributeFunctions.length; t++) {
            var n = a._isCustomAttributeFunctions[t];
            if (n(e)) {
                return !0;
            }
        }
        return !1;
    },
    getDefaultValueForProperty: function(e, t) {
        var n, r = s[e];
        r || (s[e] = r = {});
        t in r || (n = document.createElement(e), r[t] = n[t]);
        return r[t];
    },
    injection: i
};

module.exports = a;
