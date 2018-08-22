"use strict";

function r(e, t) {
    var n = i.mergeProps(t, e.props);
    if (!n.hasOwnProperty(a) && e.props.hasOwnProperty(a)) {
        n.children = e.props.children
    };
    return o.createElement(e.type, n);
}

var o = require("./ReactElement"), i = require("./ReactPropTransferer"), s = require("./keyOf"), a = (require("./warning"), 
s({
    children: null
}));

module.exports = r;