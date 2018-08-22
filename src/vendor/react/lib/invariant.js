"use strict";

var r = function(e, t, n, r, o, i, s, a) {
    if (!e) {
        var u;
        if (t === void 0) {
            u = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
        } else {
            var l = [ n, r, o, i, s, a ], c = 0;
            u = new Error("Invariant Violation: " + t.replace(/%s/g, function() {
                return l[c++];
            }));
        }
        u.framesToPop = 1;
        throw u;
    }
};

module.exports = r;