"use strict";

function r(e) {
    if (e === window) {
        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    }
    return {
        x: e.scrollLeft,
        y: e.scrollTop
    };
}

module.exports = r;