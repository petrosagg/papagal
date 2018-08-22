"use strict";

var r = require("./focusNode"), o = {
    componentDidMount: function() {
        if (this.props.autoFocus) {
            r(this.getDOMNode())
        };
    }
};

module.exports = o;
