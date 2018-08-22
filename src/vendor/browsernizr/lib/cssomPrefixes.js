var r = require("./ModernizrProto"), o = require("./omPrefixes"), i = r._config.usePrefixes ? o.split(" ") : [];

r._cssomPrefixes = i;

module.exports = i;
