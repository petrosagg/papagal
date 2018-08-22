"use strict";

var r = {
    remove: function(e) {
        e._reactInternalInstance = void 0;
    },
    get: function(e) {
        return e._reactInternalInstance;
    },
    has: function(e) {
        return void 0 !== e._reactInternalInstance;
    },
    set: function(e, t) {
        e._reactInternalInstance = t;
    }
};

module.exports = r;
