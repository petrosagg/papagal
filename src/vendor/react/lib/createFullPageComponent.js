"use strict";

function r(e) {
    var t = i.createFactory(e), n = o.createClass({
        tagName: e.toUpperCase(),
        displayName: "ReactFullPageComponent" + e,
        componentWillUnmount: function() {
            s(!1);
        },
        render: function() {
            return t(this.props);
        }
    });
    return n;
}

var o = require("./ReactClass"), i = require("./ReactElement"), s = require("./invariant");

module.exports = r;
