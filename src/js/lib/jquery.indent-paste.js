var r = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

!function(e) {
    var t, n, o, i, s, a, u, l, c, p, d, h;
    n = 9;
    t = 8;
    d = "    ";
    s = function() {
        e(this).on("paste", function(e) {
            return function() {
                return l.call(e);
            };
        }(this));
        return e(this).on("keydown", function(e) {
            return function(t) {
                return u.call(e, t);
            };
        }(this));
    };
    u = function(e) {
        var r, s;
        switch (e.which) {
          case n:
            if (e.ctrlKey || e.metaKey) {
                return;
            }
            e.preventDefault();
            if (e.shiftKey) {
                return o.call(this, this.selectionStart, this.selectionEnd);
            }
            if (this.selectionStart !== this.selectionEnd) {
                return i.call(this, this.selectionStart, this.selectionEnd);
            }
            if (this.selectionStart === this.selectionEnd) {
                if (/\s/.test(this.value.slice(0, +(this.selectionStart - 1) + 1 || 9e9).slice(-1)[0]) || this.selectionStart === 0) {
                    if (this.selectionStart === 0 || this.value.slice(0, +(this.selectionStart - 1) + 1 || 9e9).split("\n").slice(-1)[0].match(/^\s*$/)) {
                        s = this.selectionStart + 4;
                        r = this.value.split("");
                        r.splice(this.selectionStart, 0, "    ");
                        this.value = r.join("");
                        return this.setSelectionRange(s, s);
                    }
                } else {
                }
            }
            break;

          case t:
            if (!(e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) && p.call(this)) {
                e.preventDefault();
                return o.call(this, this.selectionStart, this.selectionEnd);
            }
        }
    };
    p = function() {
        var e;
        e = this.value.slice(0, +(this.selectionStart - 1) + 1 || 9e9).split("\n").slice(-1)[0];
        return this.selectionStart === this.selectionEnd && /(^|\n)[\s]{4}$/.test(e);
    };
    l = function() {
        var e;
        e = this.selectionStart;
        return setTimeout(function(t) {
            return function() {
                return a.call(t, e);
            };
        }(this), 0);
    };
    a = function(e) {
        var t, n, r, o;
        n = Helpers.IndentationHelper.pasteRegion({
            text: this.value,
            start: e,
            end: this.selectionStart
        });
        o = n.text;
        t = n.end;
        r = n.start;
        this.value = o;
        return this.setSelectionRange(t, t);
    };
    h = function(e) {
        if (e[0] === "\n") {
            e = e.substr(1, e.length - 1)
        };
        if (e[e.length - 1] === "\n") {
            e = e.substr(0, e.length - 1)
        };
        return e;
    };
    c = function(e, t) {
        return e.setSelectionRange(t, t);
    };
    i = function(e, t) {
        var n, r, o, i, s;
        i = this;
        s = i.value.split("\n");
        r = i.value.substr(0, e).split("").filter(function(e) {
            return e === "\n";
        }).length;
        o = i.value.substr(0, t).split("").filter(function(e) {
            return e === "\n";
        }).length;
        if (s[o].length === 0) {
            o -= 1
        };
        n = _.map(s.slice(r, +o + 1 || 9e9), function(e) {
            return "    " + e;
        });
        [].splice.apply(s, [ r, o - r + 1 ].concat(n));
        n;
        i.value = s.join("\n");
        return i.setSelectionRange(e + 4, t + 4 * n.length);
    };
    o = function(e, t) {
        var n, o, i, s, a, u, l, c, p, d, h;
        i = this;
        a = i.value.split("\n");
        u = function() {
            var e, t, n;
            for (n = [], e = 0, t = a.length; t > e; e++) {
                s = a[e];
                n.push(s);
            }
            return n;
        }();
        n = i.value.substr(0, e).split("").filter(function(e) {
            return e === "\n";
        }).length;
        o = i.value.substr(0, t).split("").filter(function(e) {
            return e === "\n";
        }).length;
        d = 0;
        h = a.slice(n, +o + 1 || 9e9).map(function(e) {
            if (e.slice(0, 4) === "    ") {
                d++;
                return e.substr(4);
            }
            return e;
        });
        [].splice.apply(a, [ n, o - n + 1 ].concat(h));
        h;
        i.value = a.join("\n");
        if (d) {
            p = h[0];
            c = r.call(u, p) >= 0 ? e : e - 4;
            l = o === n ? t - 4 : t - 4 * d;
            return i.setSelectionRange(c, l);
        }
        return;
    };
    return e.fn.indentPaste = function() {
        return this.each(function() {
            return s.call(this);
        });
    };
}(jQuery);
