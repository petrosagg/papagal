var r = require("./ModernizrProto"), o = require("./omPrefixes"), i = r._config.usePrefixes ? o.toLowerCase().split(" ") : [];

r._domPrefixes = i;

module.exports = i;