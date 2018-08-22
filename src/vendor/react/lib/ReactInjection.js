"use strict";

var r = require("./DOMProperty"), o = require("./EventPluginHub"), i = require("./ReactComponentEnvironment"), s = require("./ReactClass"), a = require("./ReactEmptyComponent"), u = require("./ReactBrowserEventEmitter"), l = require("./ReactNativeComponent"), c = require("./ReactDOMComponent"), p = require("./ReactPerf"), d = require("./ReactRootIndex"), h = require("./ReactUpdates"), f = {
    Component: i.injection,
    Class: s.injection,
    DOMComponent: c.injection,
    DOMProperty: r.injection,
    EmptyComponent: a.injection,
    EventPluginHub: o.injection,
    EventEmitter: u.injection,
    NativeComponent: l.injection,
    Perf: p.injection,
    RootIndex: d.injection,
    Updates: h.injection
};

module.exports = f;
