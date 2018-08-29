"use strict";

var r = {
    remove: function(e) {
        e._reactInternalInstance = undefined;
    },
    get: function(e) {
        return e._reactInternalInstance;
    },
    has: function(e) {
        return undefined !== e._reactInternalInstance;
    },
    set: function(e, t) {
        e._reactInternalInstance = t;
    }
};

module.exports = r;
