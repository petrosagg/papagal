var r;

r = ((typeof window != "undefined" && null !== window ? window._ : undefined) || require("underscore")).extend;

module.exports = r({}, require("./capped"), require("./filtered"), require("./sorted"));
