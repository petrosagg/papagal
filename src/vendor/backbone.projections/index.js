var r;

r = ((typeof window != "undefined" && window !== null ? window._ : undefined) || require("underscore")).extend;

module.exports = r({}, require("./capped"), require("./filtered"), require("./sorted"));
