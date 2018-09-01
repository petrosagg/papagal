"use strict";

function r(e, t) {
    return t == null || o.hasBooleanValue[e] && !t || o.hasNumericValue[e] && isNaN(t) || o.hasPositiveNumericValue[e] && t < 1 || o.hasOverloadedBooleanValue[e] && t === false;
}

var o = require("./DOMProperty"), i = require("./quoteAttributeValueForBrowser"), s = (require("./warning"), 
{
    createMarkupForID: function(e) {
        return o.ID_ATTRIBUTE_NAME + "=" + i(e);
    },
    createMarkupForProperty: function(e, t) {
        if (o.isStandardName.hasOwnProperty(e) && o.isStandardName[e]) {
            if (r(e, t)) {
                return "";
            }
            var n = o.getAttributeName[e];
            if (o.hasBooleanValue[e] || o.hasOverloadedBooleanValue[e] && t === true) {
                return n;
            }
            return n + "=" + i(t);
        }
        if (o.isCustomAttribute(e)) {
            if (t == null) {
                return "";
            }
            return e + "=" + i(t);
        }
        return null;
    },
    setValueForProperty: function(e, t, n) {
        if (o.isStandardName.hasOwnProperty(t) && o.isStandardName[t]) {
            var i = o.getMutationMethod[t];
            if (i) {
                i(e, n);
            } else if (r(t, n)) {
                this.deleteValueForProperty(e, t);
            } else if (o.mustUseAttribute[t]) {
                e.setAttribute(o.getAttributeName[t], "" + n);
            } else {
                var s = o.getPropertyName[t];
                if (!(o.hasSideEffects[t] && "" + e[s] == "" + n)) {
                    e[s] = n
                };
            }
        } else {
            if (o.isCustomAttribute(t)) {
                n == null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)
            };
        }
    },
    deleteValueForProperty: function(e, t) {
        if (o.isStandardName.hasOwnProperty(t) && o.isStandardName[t]) {
            var n = o.getMutationMethod[t];
            if (n) {
                n(e, undefined);
            } else if (o.mustUseAttribute[t]) {
                e.removeAttribute(o.getAttributeName[t]);
            } else {
                var r = o.getPropertyName[t], i = o.getDefaultValueForProperty(e.nodeName, r);
                if (!(o.hasSideEffects[t] && "" + e[r] === i)) {
                    e[r] = i
                };
            }
        } else {
            if (o.isCustomAttribute(t)) {
                e.removeAttribute(t)
            };
        }
    }
});

module.exports = s;
