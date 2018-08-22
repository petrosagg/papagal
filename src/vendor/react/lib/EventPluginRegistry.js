"use strict";

function r() {
    if (a) {
        for (var e in u) {
            var t = u[e], n = a.indexOf(e);
            s(n > -1)
            if (!l.plugins[n]) {
                s(t.extractEvents);
                l.plugins[n] = t;
                var r = t.eventTypes;
                for (var i in r) {
                    s(o(r[i], t, i));
                }
            }
        }
    }
}

function o(e, t, n) {
    s(!l.eventNameDispatchConfigs.hasOwnProperty(n));
    l.eventNameDispatchConfigs[n] = e;
    var r = e.phasedRegistrationNames;
    if (r) {
        for (var o in r) {
            if (r.hasOwnProperty(o)) {
                var a = r[o];
                i(a, t, n);
            }
        }
        return !0;
    }
    if (e.registrationName) {
        i(e.registrationName, t, n);
        return !0;
    }
    return !1;
}

function i(e, t, n) {
    s(!l.registrationNameModules[e]);
    l.registrationNameModules[e] = t;
    l.registrationNameDependencies[e] = t.eventTypes[n].dependencies;
}

var s = require("./invariant"), a = null, u = {}, l = {
    plugins: [],
    eventNameDispatchConfigs: {},
    registrationNameModules: {},
    registrationNameDependencies: {},
    injectEventPluginOrder: function(e) {
        s(!a);
        a = Array.prototype.slice.call(e);
        r();
    },
    injectEventPluginsByName: function(e) {
        var t = !1;
        for (var n in e) {
            if (e.hasOwnProperty(n)) {
                var o = e[n];
                u.hasOwnProperty(n) && u[n] === o || (s(!u[n]), u[n] = o, t = !0);
            }
        }
        if (t) {
            r()
        };
    },
    getPluginModuleForEvent: function(e) {
        var t = e.dispatchConfig;
        if (t.registrationName) {
            return l.registrationNameModules[t.registrationName] || null;
        }
        for (var n in t.phasedRegistrationNames) {
            if (t.phasedRegistrationNames.hasOwnProperty(n)) {
                var r = l.registrationNameModules[t.phasedRegistrationNames[n]];
                if (r) {
                    return r;
                }
            }
        }
        return null;
    },
    _resetEventPlugins: function() {
        a = null;
        for (var e in u) {
            if (u.hasOwnProperty(e)) {
                delete u[e]
            };
        }
        l.plugins.length = 0;
        var t = l.eventNameDispatchConfigs;
        for (var n in t) {
            if (t.hasOwnProperty(n)) {
                delete t[n]
            };
        }
        var r = l.registrationNameModules;
        for (var o in r) {
            if (r.hasOwnProperty(o)) {
                delete r[o]
            };
        }
    }
};

module.exports = l;