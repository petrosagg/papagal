"use strict";

function r(e) {
    return f.createClass({
        tagName: e.toUpperCase(),
        render: function() {
            return new D(e, null, null, null, null, this.props);
        }
    });
}

function o() {
    M.EventEmitter.injectReactEventListener(A);
    M.EventPluginHub.injectEventPluginOrder(u);
    M.EventPluginHub.injectInstanceHandle(F);
    M.EventPluginHub.injectMount(N);
    M.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: L,
        EnterLeaveEventPlugin: l,
        ChangeEventPlugin: s,
        MobileSafariClickEventPlugin: d,
        SelectEventPlugin: I,
        BeforeInputEventPlugin: i
    });
    M.NativeComponent.injectGenericComponentClass(v);
    M.NativeComponent.injectTextComponentClass(S);
    M.NativeComponent.injectAutoWrapper(r);
    M.Class.injectMixin(h);
    M.NativeComponent.injectComponentClasses({
        button: b,
        form: y,
        iframe: k,
        img: _,
        input: x,
        option: C,
        select: E,
        textarea: T,
        html: B("html"),
        head: B("head"),
        body: B("body")
    });
    M.DOMProperty.injectDOMPropertyConfig(p);
    M.DOMProperty.injectDOMPropertyConfig(R);
    M.EmptyComponent.injectEmptyComponent("noscript");
    M.Updates.injectReconcileTransaction(O);
    M.Updates.injectBatchingStrategy(g);
    M.RootIndex.injectCreateReactRootIndex(c.canUseDOM ? a.createReactRootIndex : P.createReactRootIndex);
    M.Component.injectEnvironment(m);
    M.DOMComponent.injectIDOperations(w);
}

var i = require("./BeforeInputEventPlugin"), s = require("./ChangeEventPlugin"), a = require("./ClientReactRootIndex"), u = require("./DefaultEventPluginOrder"), l = require("./EnterLeaveEventPlugin"), c = require("./ExecutionEnvironment"), p = require("./HTMLDOMPropertyConfig"), d = require("./MobileSafariClickEventPlugin"), h = require("./ReactBrowserComponentMixin"), f = require("./ReactClass"), m = require("./ReactComponentBrowserEnvironment"), g = require("./ReactDefaultBatchingStrategy"), v = require("./ReactDOMComponent"), b = require("./ReactDOMButton"), y = require("./ReactDOMForm"), _ = require("./ReactDOMImg"), w = require("./ReactDOMIDOperations"), k = require("./ReactDOMIframe"), x = require("./ReactDOMInput"), C = require("./ReactDOMOption"), E = require("./ReactDOMSelect"), T = require("./ReactDOMTextarea"), S = require("./ReactDOMTextComponent"), D = require("./ReactElement"), A = require("./ReactEventListener"), M = require("./ReactInjection"), F = require("./ReactInstanceHandles"), N = require("./ReactMount"), O = require("./ReactReconcileTransaction"), I = require("./SelectEventPlugin"), P = require("./ServerReactRootIndex"), L = require("./SimpleEventPlugin"), R = require("./SVGDOMPropertyConfig"), B = require("./createFullPageComponent");

module.exports = {
    inject: o
};