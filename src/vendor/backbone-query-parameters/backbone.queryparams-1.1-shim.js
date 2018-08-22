Backbone.History.prototype.navigate = function(e, t) {
    if (!Backbone.History.started) {
        return !1;
    }
    t && t !== !0 || (t = {
        trigger: !!t
    });
    var n = this.root + (e = this.getFragment(e || ""));
    if (this.fragment !== e) {
        this.fragment = e
        if (e === "" && "/" !== n) {
            n = n.slice(0, -1)
        }
        if (this._hasPushState) {
            this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
        } else {
            if (!this._wantsHashChange) {
                return this.location.assign(n);
            }
            this._updateHash(this.location, e, t.replace);
            if (this.iframe && e !== this.getFragment(this.getHash(this.iframe))) {
                t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace)
            };
        }
        if (t.trigger) {
            return this.loadUrl(e);
        }
        return;
    }
};