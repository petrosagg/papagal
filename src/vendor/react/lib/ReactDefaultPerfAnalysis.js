function r(e) {
    for (var t = 0, n = 0; n < e.length; n++) {
        var r = e[n];
        t += r.totalTime;
    }
    return t;
}

function o(e) {
    for (var t = [], n = 0; n < e.length; n++) {
        var r, o = e[n];
        for (r in o.writes) {
            o.writes[r].forEach(function(e) {
                t.push({
                    id: r,
                    type: c[e.type] || e.type,
                    args: e.args
                });
            });
        }
    }
    return t;
}

function i(e) {
    for (var t, n = {}, r = 0; r < e.length; r++) {
        var o = e[r], i = u({}, o.exclusive, o.inclusive);
        for (var s in i) {
            t = o.displayNames[s].current;
            n[t] = n[t] || {
                componentName: t,
                inclusive: 0,
                exclusive: 0,
                render: 0,
                count: 0
            };
            if (o.render[s]) {
                n[t].render += o.render[s]
            };
            if (o.exclusive[s]) {
                n[t].exclusive += o.exclusive[s]
            };
            if (o.inclusive[s]) {
                n[t].inclusive += o.inclusive[s]
            };
            if (o.counts[s]) {
                n[t].count += o.counts[s]
            };
        }
    }
    var a = [];
    for (t in n) {
        if (n[t].exclusive >= l) {
            a.push(n[t])
        };
    }
    a.sort(function(e, t) {
        return t.exclusive - e.exclusive;
    });
    return a;
}

function s(e, t) {
    for (var n, r = {}, o = 0; o < e.length; o++) {
        var i, s = e[o], c = u({}, s.exclusive, s.inclusive);
        if (t) {
            i = a(s)
        };
        for (var p in c) {
            if (!t || i[p]) {
                var d = s.displayNames[p];
                n = d.owner + " > " + d.current;
                r[n] = r[n] || {
                    componentName: n,
                    time: 0,
                    count: 0
                };
                if (s.inclusive[p]) {
                    r[n].time += s.inclusive[p]
                };
                if (s.counts[p]) {
                    r[n].count += s.counts[p]
                };
            }
        }
    }
    var h = [];
    for (n in r) {
        if (r[n].time >= l) {
            h.push(r[n])
        };
    }
    h.sort(function(e, t) {
        return t.time - e.time;
    });
    return h;
}

function a(e) {
    var t = {}, n = Object.keys(e.writes), r = u({}, e.exclusive, e.inclusive);
    for (var o in r) {
        for (var i = false, s = 0; s < n.length; s++) {
            if (n[s].indexOf(o) === 0) {
                i = true;
                break;
            }
        }
        if (!i && e.counts[o] > 0) {
            t[o] = true
        };
    }
    return t;
}

var u = require("./Object.assign"), l = 1.2, c = {
    _mountImageIntoNode: "set innerHTML",
    INSERT_MARKUP: "set innerHTML",
    MOVE_EXISTING: "move",
    REMOVE_NODE: "remove",
    TEXT_CONTENT: "set textContent",
    updatePropertyByID: "update attribute",
    deletePropertyByID: "delete attribute",
    updateStylesByID: "update styles",
    updateInnerHTMLByID: "set innerHTML",
    dangerouslyReplaceNodeWithMarkupByID: "replace"
}, p = {
    getExclusiveSummary: i,
    getInclusiveSummary: s,
    getDOMSummary: o,
    getTotalTime: r
};

module.exports = p;
