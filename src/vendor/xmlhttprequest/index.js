var r = require("has-cors");

module.exports = function(e) {
    var t = e.xdomain, n = e.xscheme, o = e.enablesXDR;
    try {
        if (typeof XMLHttpRequest != "undefined" && (!t || r)) {
            return new XMLHttpRequest();
        }
    } catch (i) {}
    try {
        if (typeof XDomainRequest != "undefined" && !n && o) {
            return new XDomainRequest();
        }
    } catch (i) {}
    if (!t) {
        try {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } catch (i) {}
    }
};
