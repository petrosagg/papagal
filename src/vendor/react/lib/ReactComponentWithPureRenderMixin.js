"use strict";

var r = require("./shallowEqual"), o = {
    shouldComponentUpdate: function(e, t) {
        return !r(this.props, e) || !r(this.state, t);
    }
};

module.exports = o;