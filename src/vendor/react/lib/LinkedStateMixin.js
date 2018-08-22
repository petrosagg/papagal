"use strict";

var r = require("./ReactLink"), o = require("./ReactStateSetters"), i = {
    linkState: function(e) {
        return new r(this.state[e], o.createStateKeySetter(this, e));
    }
};

module.exports = i;