"use strict";

var r = require("./LinkedStateMixin"), o = require("./React"), i = require("./ReactComponentWithPureRenderMixin"), s = require("./ReactCSSTransitionGroup"), a = require("./ReactFragment"), u = require("./ReactTransitionGroup"), l = require("./ReactUpdates"), c = require("./cx"), p = require("./cloneWithProps"), d = require("./update");

o.addons = {
    CSSTransitionGroup: s,
    LinkedStateMixin: r,
    PureRenderMixin: i,
    TransitionGroup: u,
    batchedUpdates: l.batchedUpdates,
    classSet: c,
    cloneWithProps: p,
    createFragment: a.create,
    update: d
};

module.exports = o;