function r() {
    var e, t, n, r, u, l, c;
    for (var p in o) {
        e = [];
        t = o[p];
        if (t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length)) {
            for (n = 0; n < t.options.aliases.length; n++) {
                e.push(t.options.aliases[n].toLowerCase());
            }
        }
        for (r = a(t.fn, "function") ? t.fn() : t.fn, u = 0; u < e.length; u++) {
            l = e[u];
            c = l.split(".");
            c.length === 1 ? i[c[0]] = r : (!i[c[0]] || i[c[0]] instanceof Boolean || (i[c[0]] = new Boolean(i[c[0]])), 
            i[c[0]][c[1]] = r);
            s.push((r ? "" : "no-") + c.join("-"));
        }
    }
}

var o = require("./tests"), i = require("./Modernizr"), s = require("./classes"), a = require("./is");

module.exports = r;
