"use strict";

function r(e) {
    return Math.floor(100 * e) / 100;
}

function o(e, t, n) {
    e[t] = (e[t] || 0) + n;
}

var i = require("./DOMProperty"), s = require("./ReactDefaultPerfAnalysis"), a = require("./ReactMount"), u = require("./ReactPerf"), l = require("./performanceNow"), c = {
    _allMeasurements: [],
    _mountStack: [ 0 ],
    _injected: !1,
    start: function() {
        c._injected || u.injection.injectMeasure(c.measure);
        c._allMeasurements.length = 0;
        u.enableMeasure = !0;
    },
    stop: function() {
        u.enableMeasure = !1;
    },
    getLastMeasurements: function() {
        return c._allMeasurements;
    },
    printExclusive: function(e) {
        e = e || c._allMeasurements;
        var t = s.getExclusiveSummary(e);
        console.table(t.map(function(e) {
            return {
                "Component class name": e.componentName,
                "Total inclusive time (ms)": r(e.inclusive),
                "Exclusive mount time (ms)": r(e.exclusive),
                "Exclusive render time (ms)": r(e.render),
                "Mount time per instance (ms)": r(e.exclusive / e.count),
                "Render time per instance (ms)": r(e.render / e.count),
                Instances: e.count
            };
        }));
    },
    printInclusive: function(e) {
        e = e || c._allMeasurements;
        var t = s.getInclusiveSummary(e);
        console.table(t.map(function(e) {
            return {
                "Owner > component": e.componentName,
                "Inclusive time (ms)": r(e.time),
                Instances: e.count
            };
        }));
        console.log("Total time:", s.getTotalTime(e).toFixed(2) + " ms");
    },
    getMeasurementsSummaryMap: function(e) {
        var t = s.getInclusiveSummary(e, !0);
        return t.map(function(e) {
            return {
                "Owner > component": e.componentName,
                "Wasted time (ms)": e.time,
                Instances: e.count
            };
        });
    },
    printWasted: function(e) {
        e = e || c._allMeasurements;
        console.table(c.getMeasurementsSummaryMap(e));
        console.log("Total time:", s.getTotalTime(e).toFixed(2) + " ms");
    },
    printDOM: function(e) {
        e = e || c._allMeasurements;
        var t = s.getDOMSummary(e);
        console.table(t.map(function(e) {
            var t = {};
            t[i.ID_ATTRIBUTE_NAME] = e.id;
            t.type = e.type;
            t.args = JSON.stringify(e.args);
            return t;
        }));
        console.log("Total time:", s.getTotalTime(e).toFixed(2) + " ms");
    },
    _recordWrite: function(e, t, n, r) {
        var o = c._allMeasurements[c._allMeasurements.length - 1].writes;
        o[e] = o[e] || [];
        o[e].push({
            type: t,
            time: n,
            args: r
        });
    },
    measure: function(e, t, n) {
        return function() {
            for (var r = [], i = 0, s = arguments.length; s > i; i++) {
                r.push(arguments[i]);
            }
            var u, p, d;
            if (t === "_renderNewRootComponent" || t === "flushBatchedUpdates") {
                c._allMeasurements.push({
                    exclusive: {},
                    inclusive: {},
                    render: {},
                    counts: {},
                    writes: {},
                    displayNames: {},
                    totalTime: 0
                });
                d = l();
                p = n.apply(this, r);
                c._allMeasurements[c._allMeasurements.length - 1].totalTime = l() - d;
                return p;
            }
            if (t === "_mountImageIntoNode" || e === "ReactDOMIDOperations") {
                d = l();
                p = n.apply(this, r);
                u = l() - d;
                if (t === "_mountImageIntoNode") {
                    var h = a.getID(r[1]);
                    c._recordWrite(h, t, u, r[0]);
                } else if (t === "dangerouslyProcessChildrenUpdates") {
                    r[0].forEach(function(e) {
                        var t = {};
                        if (null !== e.fromIndex) {
                            t.fromIndex = e.fromIndex
                        };
                        if (null !== e.toIndex) {
                            t.toIndex = e.toIndex
                        };
                        if (null !== e.textContent) {
                            t.textContent = e.textContent
                        };
                        if (null !== e.markupIndex) {
                            t.markup = r[1][e.markupIndex]
                        };
                        c._recordWrite(e.parentID, e.type, u, t);
                    });
                } else c._recordWrite(r[0], t, u, Array.prototype.slice.call(r, 1));
                return p;
            }
            if ("ReactCompositeComponent" !== e || "mountComponent" !== t && "updateComponent" !== t && "_renderValidatedComponent" !== t) {
                return n.apply(this, r);
            }
            if (typeof this._currentElement.type == "string") {
                return n.apply(this, r);
            }
            var f = t === "mountComponent" ? r[0] : this._rootNodeID, m = t === "_renderValidatedComponent", g = t === "mountComponent", v = c._mountStack, b = c._allMeasurements[c._allMeasurements.length - 1];
            if (m) {
                o(b.counts, f, 1);
            } else if (g) {
                v.push(0)
            };
            d = l();
            p = n.apply(this, r);
            u = l() - d;
            if (m) {
                o(b.render, f, u);
            } else if (g) {
                var y = v.pop();
                v[v.length - 1] += u;
                o(b.exclusive, f, u - y);
                o(b.inclusive, f, u);
            } else o(b.inclusive, f, u);
            b.displayNames[f] = {
                current: this.getName(),
                owner: this._currentElement._owner ? this._currentElement._owner.getName() : "<root>"
            };
            return p;
        };
    }
};

module.exports = c;
