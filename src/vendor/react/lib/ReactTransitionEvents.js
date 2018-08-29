"use strict";

function r() {
    var e = document.createElement("div"), t = e.style;
    "AnimationEvent" in window || delete a.animationend.animation;
    "TransitionEvent" in window || delete a.transitionend.transition;
    for (var n in a) {
        var r = a[n];
        for (var o in r) {
            if (o in t) {
                u.push(r[o]);
                break;
            }
        }
    }
}

function o(e, t, n) {
    e.addEventListener(t, n, false);
}

function i(e, t, n) {
    e.removeEventListener(t, n, false);
}

var s = require("./ExecutionEnvironment"), a = {
    transitionend: {
        transition: "transitionend",
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "mozTransitionEnd",
        OTransition: "oTransitionEnd",
        msTransition: "MSTransitionEnd"
    },
    animationend: {
        animation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        OAnimation: "oAnimationEnd",
        msAnimation: "MSAnimationEnd"
    }
}, u = [];

if (s.canUseDOM) {
    r()
};

var l = {
    addEndEventListener: function(e, t) {
        if (u.length === 0) {
            return void window.setTimeout(t, 0);
        }
        return void u.forEach(function(n) {
            o(e, n, t);
        });
    },
    removeEndEventListener: function(e, t) {
        if (0 !== u.length) {
            u.forEach(function(n) {
                i(e, n, t);
            })
        };
    }
};

module.exports = l;
