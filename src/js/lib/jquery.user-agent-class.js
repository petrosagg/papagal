var r, o, i, s;

r = jQuery;

r.fn.userAgentClass = s = function(e) {
    var t;
    if (e == null) {
        e = window.navigator.userAgent
    };
    t = s.uaMatch(e);
    this.addClass(t.browser + " " + t.os);
    return this;
};

i = function(e) {
    return /(ipad|iphone|ipad)/.exec(e) && "ios" || /(android)/.exec(e) && "android" || /(mac os x)/.exec(e) && "macosx" || /(windows)/.exec(e) && "windows" || /(linux)/.exec(e) && "linux" || "other";
};

o = function(e) {
    return (/(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e) || /(iemobile)\/([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(e) || []).slice(1);
};

s.uaMatch = function(e) {
    var t, n, r;
    e = e.toLowerCase();
    n = o(e);
    t = n[0];
    r = n[1];
    return {
        browser: t || "",
        version: r || "0",
        os: i(e)
    };
};
