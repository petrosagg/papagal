"use strict";

var r = require("./EventPluginUtils"), o = require("./ReactChildren"), i = require("./ReactComponent"), s = require("./ReactClass"), a = require("./ReactContext"), u = require("./ReactCurrentOwner"), l = require("./ReactElement"), c = (require("./ReactElementValidator"), 
require("./ReactDOM")), p = require("./ReactDOMTextComponent"), d = require("./ReactDefaultInjection"), h = require("./ReactInstanceHandles"), f = require("./ReactMount"), m = require("./ReactPerf"), g = require("./ReactPropTypes"), v = require("./ReactReconciler"), b = require("./ReactServerRendering"), y = require("./Object.assign"), _ = require("./findDOMNode"), w = require("./onlyChild");

d.inject();

var k = l.createElement, x = l.createFactory, C = l.cloneElement, E = m.measure("React", "render", f.render), T = {
    Children: {
        map: o.map,
        forEach: o.forEach,
        count: o.count,
        only: w
    },
    Component: i,
    DOM: c,
    PropTypes: g,
    initializeTouchEvents: function(e) {
        r.useTouchEvents = e;
    },
    createClass: s.createClass,
    createElement: k,
    cloneElement: C,
    createFactory: x,
    createMixin: function(e) {
        return e;
    },
    constructAndRenderComponent: f.constructAndRenderComponent,
    constructAndRenderComponentByID: f.constructAndRenderComponentByID,
    findDOMNode: _,
    render: E,
    renderToString: b.renderToString,
    renderToStaticMarkup: b.renderToStaticMarkup,
    unmountComponentAtNode: f.unmountComponentAtNode,
    isValidElement: l.isValidElement,
    withContext: a.withContext,
    __spread: y
};

if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ != "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject == "function") {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        CurrentOwner: u,
        InstanceHandles: h,
        Mount: f,
        Reconciler: v,
        TextComponent: p
    })
};

T.version = "0.13.3";

module.exports = T;
