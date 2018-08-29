var r, o, i = [].slice, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = {
    backspace: 8,
    tab: 9,
    enter: 13,
    esc: 27,
    spacebar: 32,
    pagedown: 33,
    pageup: 34,
    home: 35,
    end: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
    forwardSlash: [ 47, 191 ],
    bracketRight: 219,
    bracketLeft: 221,
    plus: 187,
    minus: 189,
    numeric: [ 48, 49, 50, 51, 52, 53, 54, 55, 56, 57 ].concat([ 96, 97, 98, 99, 100, 101, 102, 103, 104, 105 ]),
    "?": 63,
    a: 65,
    b: 66,
    c: 67,
    d: 68,
    e: 69,
    f: 70,
    g: 71,
    h: 72,
    i: 73,
    j: 74,
    k: 75,
    l: 76,
    m: 77,
    n: 78,
    o: 79,
    p: 80,
    q: 81,
    r: 82,
    s: 83,
    t: 84,
    u: 85,
    v: 86,
    w: 87,
    x: 88,
    y: 89,
    z: 90,
    semicolon: 186,
    comma: 188
};

o = {
    ctrl: "ctrlKey",
    alt: "altKey",
    meta: "metaKey",
    cmd: "metaKey",
    shift: "shiftKey"
};

r.cursor = [ r.left, r.up, r.right, r.down ];

window.KeyEvent = {
    keymap: r,
    modifierDown: function(e) {
        return e.ctrlKey || e.altKey || e.metaKey;
    },
    is: function() {
        var e, t, n;
        n = arguments.length >= 1 ? i.call(arguments, 0) : [];
        e = _.flatten(n.map(function(e) {
            return e.split(":");
        }));
        t = [];
        _.each(e, function(e) {
            var n;
            n = {
                modifiers: [],
                keyCodes: []
            };
            _.each(e.split("+"), function(e) {
                var t, i;
                t = r[e];
                if (t) {
                    return n.keyCodes.push(t);
                }
                i = o[e];
                if (i) {
                    return n.modifiers.push(i);
                }
                return;
            });
            n.keyCodes = _.flatten(n.keyCodes);
            return t.push(n);
        });
        return function(n) {
            var r;
            if (n.type === "keypress") {
                r = String.fromCharCode(n.which);
                return s.call(e, r) >= 0;
            }
            return _.find(t, function(e) {
                var t, r, o, i, a, u;
                for (i = [], a = [ "ctrlKey", "altKey", "metaKey", "shiftKey" ], t = 0, r = a.length; r > t; t++) {
                    o = a[t];
                    if (n[o] === true) {
                        i.push(o)
                    };
                }
                if (_.isEqual(i.sort(), e.modifiers.sort())) {
                    u = n.which;
                    if (s.call(e.keyCodes, u) >= 0) {
                        return true;
                    }
                    return;
                }
                return false;
            }) != null;
        };
    },
    isKey: function() {
        var e, t, n;
        n = arguments.length >= 1 ? i.call(arguments, 0) : [];
        e = _.flatten(function() {
            var e, o, i;
            for (i = [], e = 0, o = n.length; o > e; e++) {
                t = n[e];
                i.push(r[t]);
            }
            return i;
        }());
        return function(t) {
            var n;
            n = t.which;
            return s.call(e, n) >= 0;
        };
    },
    not: function() {
        var e, t, n;
        n = arguments.length >= 1 ? i.call(arguments, 0) : [];
        e = _.flatten(function() {
            var e, o, i;
            for (i = [], e = 0, o = n.length; o > e; e++) {
                t = n[e];
                i.push(r[t]);
            }
            return i;
        }());
        return function(t) {
            var n;
            n = t.which;
            return !(s.call(e, n) >= 0);
        };
    }
};
