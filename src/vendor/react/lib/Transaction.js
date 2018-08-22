"use strict";

var r = require("./invariant"), o = {
    reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        this.wrapperInitData ? this.wrapperInitData.length = 0 : this.wrapperInitData = [];
        this._isInTransaction = !1;
    },
    _isInTransaction: !1,
    getTransactionWrappers: null,
    isInTransaction: function() {
        return !!this._isInTransaction;
    },
    perform: function(e, t, n, o, i, s, a, u) {
        r(!this.isInTransaction());
        var l, c;
        try {
            this._isInTransaction = !0;
            l = !0;
            this.initializeAll(0);
            c = e.call(t, n, o, i, s, a, u);
            l = !1;
        } finally {
            try {
                if (l) try {
                    this.closeAll(0);
                } catch (p) {} else this.closeAll(0);
            } finally {
                this._isInTransaction = !1;
            }
        }
        return c;
    },
    initializeAll: function(e) {
        for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
            var r = t[n];
            try {
                this.wrapperInitData[n] = i.OBSERVED_ERROR;
                this.wrapperInitData[n] = r.initialize ? r.initialize.call(this) : null;
            } finally {
                if (this.wrapperInitData[n] === i.OBSERVED_ERROR) try {
                    this.initializeAll(n + 1);
                } catch (o) {}
            }
        }
    },
    closeAll: function(e) {
        r(this.isInTransaction());
        for (var t = this.transactionWrappers, n = e; n < t.length; n++) {
            var o, s = t[n], a = this.wrapperInitData[n];
            try {
                o = !0;
                if (a !== i.OBSERVED_ERROR && s.close) {
                    s.close.call(this, a)
                };
                o = !1;
            } finally {
                if (o) try {
                    this.closeAll(n + 1);
                } catch (u) {}
            }
        }
        this.wrapperInitData.length = 0;
    }
}, i = {
    Mixin: o,
    OBSERVED_ERROR: {}
};

module.exports = i;