var r = require("./ModernizrProto"), o = r._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : [];

r._prefixes = o;

module.exports = o;
