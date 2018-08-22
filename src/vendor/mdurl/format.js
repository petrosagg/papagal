"use strict";

module.exports = function(e) {
    var t = "";
    t += e.protocol || "";
    t += e.slashes ? "//" : "";
    t += e.auth ? e.auth + "@" : "";
    t += e.hostname && -1 !== e.hostname.indexOf(":") ? "[" + e.hostname + "]" : e.hostname || "";
    t += e.port ? ":" + e.port : "";
    t += e.pathname || "";
    t += e.search || "";
    return t += e.hash || "";
};
