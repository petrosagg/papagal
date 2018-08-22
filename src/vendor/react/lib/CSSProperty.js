"use strict";

function r(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
}

var o = {
    boxFlex: !0,
    boxFlexGroup: !0,
    columnCount: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    strokeDashoffset: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}, i = [ "Webkit", "ms", "Moz", "O" ];

Object.keys(o).forEach(function(e) {
    i.forEach(function(t) {
        o[r(t, e)] = o[e];
    });
});

var s = {
    background: {
        backgroundImage: !0,
        backgroundPosition: !0,
        backgroundRepeat: !0,
        backgroundColor: !0
    },
    border: {
        borderWidth: !0,
        borderStyle: !0,
        borderColor: !0
    },
    borderBottom: {
        borderBottomWidth: !0,
        borderBottomStyle: !0,
        borderBottomColor: !0
    },
    borderLeft: {
        borderLeftWidth: !0,
        borderLeftStyle: !0,
        borderLeftColor: !0
    },
    borderRight: {
        borderRightWidth: !0,
        borderRightStyle: !0,
        borderRightColor: !0
    },
    borderTop: {
        borderTopWidth: !0,
        borderTopStyle: !0,
        borderTopColor: !0
    },
    font: {
        fontStyle: !0,
        fontVariant: !0,
        fontWeight: !0,
        fontSize: !0,
        lineHeight: !0,
        fontFamily: !0
    }
}, a = {
    isUnitlessNumber: o,
    shorthandPropertyExpansions: s
};

module.exports = a;