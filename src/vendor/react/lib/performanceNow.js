var r = require("./performance");

r && r.now || (r = Date);

var o = r.now.bind(r);

module.exports = o;
