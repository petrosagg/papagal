function r(e) {
    var t = /^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);
    if (t) {
        var n = parseFloat(t[1]), r = (t[2] || "ms").toLowerCase();
        switch (r) {
          case "years":
          case "year":
          case "y":
            return n * p;

          case "days":
          case "day":
          case "d":
            return n * c;

          case "hours":
          case "hour":
          case "h":
            return n * l;

          case "minutes":
          case "minute":
          case "m":
            return n * u;

          case "seconds":
          case "second":
          case "s":
            return n * a;

          case "ms":
            return n;
        }
    }
}

function o(e) {
    if (e >= c) {
        return Math.round(e / c) + "d";
    }
    if (e >= l) {
        return Math.round(e / l) + "h";
    }
    if (e >= u) {
        return Math.round(e / u) + "m";
    }
    if (e >= a) {
        return Math.round(e / a) + "s";
    }
    return e + "ms";
}

function i(e) {
    return s(e, c, "day") || s(e, l, "hour") || s(e, u, "minute") || s(e, a, "second") || e + " ms";
}

function s(e, t, n) {
    if (t > e) {
        return void 0;
    }
    if (1.5 * t > e) {
        return Math.floor(e / t) + " " + n;
    }
    return Math.ceil(e / t) + " " + n + "s";
}

var a = 1e3, u = 60 * a, l = 60 * u, c = 24 * l, p = 365.25 * c;

module.exports = function(e, t) {
    t = t || {};
    if (typeof e == "string") {
        return r(e);
    }
    if (t["long"]) {
        return i(e);
    }
    return o(e);
};
