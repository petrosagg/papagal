"use strict";

var r = !(typeof window == "undefined" || !window.document || !window.document.createElement), o = {
    canUseDOM: r,
    canUseWorkers: typeof Worker != "undefined",
    canUseEventListeners: r && !(!window.addEventListener && !window.attachEvent),
    canUseViewport: r && !!window.screen,
    isInWorker: !r
};

module.exports = o;