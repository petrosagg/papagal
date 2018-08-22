var r = require("./lib/Modernizr"), o = require("./lib/ModernizrProto"), i = require("./lib/classes"), s = require("./lib/testRunner"), a = require("./lib/setClasses");

s();

a(i);

delete o.addTest;

delete o.addAsyncTest;

for (var u = 0; u < r._q.length; u++) {
    r._q[u]();
}

module.exports = r;