var r = require("./ModernizrProto"), o = require("./testPropsAll"), i = require("./cssToDOM"), s = require("./atRule"), a = r.prefixed = function(e, t, n) {
    if (e.indexOf("@") === 0) {
        return s(e);
    }
    if (e.indexOf("-") != -1) {
        e = i(e)
    };
    if (t) {
        return o(e, t, n);
    }
    return o(e, "pfx");
};

module.exports = a;