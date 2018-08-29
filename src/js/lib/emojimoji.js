var r, o, i, s, a, u, l, c, p, d;

r = require("emojie/emojie");

s = require("./emoji_data");

window.emojie = r();

window.emojimoji = function(e) {
    return e.replace(/:([\w-+]+):/gm, function(e, t) {
        var n;
        n = p[t.toLowerCase()];
        if (n) {
            return _.last(n[0]);
        }
        return ":" + t + ":";
    });
};

window.remojimoji = function(e) {
    var t, n, o, i, s;
    for (t in p) {
        n = p[t];
        if (n) {
            for (i = n[0], o = i.length - 1; o >= 0; o += -1) {
                s = i[o];
                e = e.replace(new RegExp(s, "gm"), function(e) {
                    if (r.canRender(e)) {
                        return e;
                    }
                    return ":" + t + ":";
                });
            }
        }
    }
    return e;
};

p = s.codes;

o = function(e, t) {
    var n, r;
    n = e.charCodeAt(t);
    r = e.charCodeAt(t + 1);
    if (n >= 55296 && n <= 56319 && r >= 56320 && r <= 57343) {
        return 1024 * (n - 55296) + (r - 56320) + 65536;
    }
    return n;
};

i = function(e) {
    var t, n, r, i, s;
    for (n = e.length > 2 ? [ o(e, 0), o(e, 2) ] : [ o(e, 0) ], s = [], r = 0, i = n.length; i > r; r++) {
        t = n[r];
        s.push(t.toString(16));
    }
    return s;
};

d = function(e) {
    return "https://d2ph5hv9wbwvla.cloudfront.net/emoji/2/" + encodeURIComponent(e) + ".png";
};

a = function(e) {
    var t, n, r, o, i;
    t = 100 / (s.sheetSize - 1);
    r = s.codes[e];
    n = r[0];
    o = r[1];
    i = r[2];
    return "background-position: " + (o * t).toFixed(4) + "% " + (i * t).toFixed(4) + "%";
};

u = r.canRender("1️⃣") ? function(e, t) {
    return {
        elementName: "span",
        content: t,
        title: ":" + e + ":",
        class: "emojie"
    };
} : function(e, t, n) {
    return {
        elementName: "i",
        content: "",
        title: ":" + (n || e) + ":",
        class: "emoji",
        style: a(e)
    };
};

l = function(e, t, n) {
    var r;
    r = ":" + (n || e) + ":";
    window.emojimoji.autocomplete.push(r);
    if (Array.isArray(t)) {
        return t[0].forEach(function(t) {
            var r;
            r = n ? ":" + n + ":" : t;
            return window.emojie.register(r || t, u(e, t, n));
        });
    }
    return c(e, n);
};

c = function(e, t) {
    return window.emojie.custom.register(":" + (t || e) + ":", {
        title: ":" + (t || e) + ":",
        src: d(e),
        class: "emojie"
    });
};

window.emojimoji.autocomplete = [];

window.emojie.custom = r();

_.each(s.codes, function(e, t) {
    return l(t, e);
});

_.each(s.custom, function(e) {
    return l(e);
});

_.each(s.alternatives, function(e, t) {
    return e.forEach(function(e) {
        return l(t, s.codes[t], e);
    });
});
