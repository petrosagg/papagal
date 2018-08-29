"use strict";

function r(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
}

var o = {
    boxFlex: true,
    boxFlexGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    strokeDashoffset: true,
    strokeOpacity: true,
    strokeWidth: true
}, i = [ "Webkit", "ms", "Moz", "O" ];

Object.keys(o).forEach(function(e) {
    i.forEach(function(t) {
        o[r(t, e)] = o[e];
    });
});

var s = {
    background: {
        backgroundImage: true,
        backgroundPosition: true,
        backgroundRepeat: true,
        backgroundColor: true
    },
    border: {
        borderWidth: true,
        borderStyle: true,
        borderColor: true
    },
    borderBottom: {
        borderBottomWidth: true,
        borderBottomStyle: true,
        borderBottomColor: true
    },
    borderLeft: {
        borderLeftWidth: true,
        borderLeftStyle: true,
        borderLeftColor: true
    },
    borderRight: {
        borderRightWidth: true,
        borderRightStyle: true,
        borderRightColor: true
    },
    borderTop: {
        borderTopWidth: true,
        borderTopStyle: true,
        borderTopColor: true
    },
    font: {
        fontStyle: true,
        fontVariant: true,
        fontWeight: true,
        fontSize: true,
        lineHeight: true,
        fontFamily: true
    }
}, a = {
    isUnitlessNumber: o,
    shorthandPropertyExpansions: s
};

module.exports = a;
