var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

r = function(e, t, n) {
    var r, o, i, s;
    o = "view:" + e.toLowerCase() + ":before";
    r = "view:" + e.toLowerCase() + ":after";
    i = "on" + e;
    s = e.toLowerCase() + "Components";
    return function() {
        var e, a, u, l;
        if (this.isMasked(t)) {
            return this._pendingTriggers[t] = !0;
        }
        for (delete this._pendingTriggers[t], n && delete this._pendingTriggers[n], this.trigger(o), 
        u = this.subviews, e = 0, a = u.length; a > e; e++) {
            l = u[e];
            if (_.isFunction(l[t])) {
                l[t]()
            };
            if (l._components.length > 0) {
                this[s].apply(l)
            };
        }
        if (_.isFunction(this[i])) {
            this[i]()
        };
        return _.defer(function(e) {
            return function() {
                return e.trigger(r);
            };
        }(this));
    };
};

Flowdock.HierarchicalView = function(e) {
    function HierarchicalView(e) {
        var n, r, o, i, s;
        this.subviews = []
        this._components = []
        if (e != null && e.flow) {
            this.flow = e.flow
        }
        HierarchicalView.__super__.constructor.apply(this, arguments)
        this._pendingTriggers = {}
        if (this.model != null && this.modelEvents != null) {
            o = this.modelEvents;
            for (n in o) {
                r = o[n];
                if (_.isFunction(this[r])) {
                    this.listenTo(this.model, n, this[r])
                };
            }
        }
        if (this.collection != null && this.collectionEvents != null) {
            i = this.collectionEvents;
            for (n in i) {
                r = i[n];
                if (_.isFunction(this[r])) {
                    this.listenTo(this.collection, n, this[r])
                };
            }
        }
        if (this.flow != null && this.flowEvents != null) {
            s = this.flowEvents;
            for (n in s) {
                r = s[n];
                if (_.isFunction(this[r])) {
                    this.listenTo(this.flow, n, this[r])
                };
            }
        }
    }
    o(HierarchicalView, e);
    HierarchicalView.prototype.modelEvents = void 0;
    HierarchicalView.prototype.collectionEvents = void 0;
    HierarchicalView.prototype.flowEvents = void 0;
    HierarchicalView.prototype.addStream = function(e) {
        this._unsubscribers || (this._unsubscribers = []);
        this._unsubscribers.push(e);
        return e;
    };
    HierarchicalView.prototype.untilEnd = function(e) {
        this._end || (this._end = this.asEventStream("destructor"));
        return e.takeUntil(this._end);
    };
    HierarchicalView.prototype.subview = function(e) {
        if (!(e instanceof Flowdock.HierarchicalView)) {
            console.error("View is not an instance of HierarchicalView", e);
            throw new Error("View is not an instance of HierarchicalView");
        }
        this.subviews.indexOf(e) >= 0 || this.subviews.push(e);
        return e;
    };
    HierarchicalView.prototype.render = function() {
        this.destroyComponents();
        return HierarchicalView.__super__.render.apply(this, arguments);
    };
    HierarchicalView.prototype.destroyComponent = function(e) {
        var t;
        React.unmountComponentAtNode(e);
        t = this._components.indexOf(e);
        if (t > -1) {
            return this._components.splice(t, 1);
        }
        return;
    };
    HierarchicalView.prototype.destroyComponents = function() {
        var e, t, n, r;
        for (r = this._components, t = 0, n = r.length; n > t; t++) {
            e = r[t];
            this.destroyComponent(e.el);
        }
        return this._components = [];
    };
    HierarchicalView.prototype._findComponentByDOMElement = function(e) {
        return _.where(this._components, {
            el: e
        })[0];
    };
    HierarchicalView.prototype.component = function(e, t) {
        var n, r;
        r = React.render(t, e);
        (n = this._findComponentByDOMElement(e)) ? n.instance = r : this._components.push({
            el: e,
            instance: r
        });
        return r;
    };
    HierarchicalView.prototype.removeSubview = function(e, t) {
        var n, r, o, i, s, a;
        for (t == null && (t = {}), s = this.findSubviews(e), n = 0, o = s.length; o > n; n++) {
            a = s[n];
            if (t.destroy !== !1) {
                a.destructor(t)
            };
            this.stopListening(a);
            r = this.subviews.indexOf(a);
            if (r > -1) {
                [].splice.apply(this.subviews, [ r, r - r + 1 ].concat(i = [])), i
            };
        }
        return s;
    };
    HierarchicalView.prototype.findSubviews = function(e) {
        var t, n, r, o, i, s;
        if (e == null) {
            return [];
        }
        if (this.subviews.indexOf(e) >= 0) {
            return [ e ];
        }
        for (r = this.subviews, i = [], t = 0, n = r.length; n > t; t++) {
            s = r[t];
            if (s.model === e || e.id != null && e.id === ((o = s.model) != null ? o.id : void 0)) {
                i.push(s)
            };
        }
        return i;
    };
    HierarchicalView.prototype.destructor = function(e) {
        var t, n, r, o, i, s, a, u;
        for (e == null && (e = {}), i = this.subviews.slice(0), t = 0, r = i.length; r > t; t++) {
            u = i[t];
            this.removeSubview(u, {
                removeDomElement: !1
            });
        }
        this.subviews = []
        this.destroyComponents()
        this.trigger("destructor", e)
        if (this._unsubscribers != null) {
            for (s = this._unsubscribers, n = 0, o = s.length; o > n; n++) {
                (a = s[n])();
            }
            this._unsubscribers = null;
        }
        this.undelegateEvents();
        e.removeDomElement === !1 ? this.stopListening() : this.remove();
        if (this.flow) {
            this.flow = null
        };
        if (this.model) {
            this.model = null
        };
        if (this.collection) {
            this.collection = null
        };
        if (this._end) {
            return this._end = null;
        }
        return;
    };
    HierarchicalView.prototype.attachedProperty = function(e, t) {
        if (e == null) {
            e = "before"
        };
        if (t == null) {
            t = "before"
        };
        return this.untilEnd(Bacon.mergeAll(this.asEventStream("view:attach:" + e).map(!0), this.asEventStream("view:detach:" + t).map(!1))).skipDuplicates().toProperty(this.isAttached());
    };
    HierarchicalView.prototype.whenAttached = function(e) {
        if (this.isAttached()) {
            return e.call(this);
        }
        return this.listenToOnce(this, "view:attach:after", e);
    };
    HierarchicalView.prototype.isAttached = function() {
        return jQuery.contains(document, this.el);
    };
    HierarchicalView.prototype.triggerAttach = r("Attach", "triggerAttach", "triggerDetach");
    HierarchicalView.prototype.triggerDetach = r("Detach", "triggerDetach", "triggerAttach");
    HierarchicalView.prototype.unmaskTrigger = function(e) {
        if (this._preventTriggering) {
            delete this._preventTriggering[e]
        };
        if (this._pendingTriggers[e]) {
            delete this._pendingTriggers[e], this[e]()
        };
        return this;
    };
    HierarchicalView.prototype.maskTrigger = function(e) {
        this._preventTriggering || (this._preventTriggering = {});
        this._preventTriggering[e] = !0;
        return this;
    };
    HierarchicalView.prototype.isMasked = function(e) {
        return !!(this._preventTriggering || {})[e];
    };
    HierarchicalView.prototype.detach = function() {
        if (this._detached) {
            return this;
        }
        this._detached = !0;
        this._attached = !1;
        this.triggerDetach();
        this.$el.detach();
        return this.maskTrigger("triggerAttach");
    };
    HierarchicalView.prototype.attach = function(e) {
        if (e == null) {
            e = !1
        };
        if (this._attached) {
            return this;
        }
        this._attached = !0;
        this._detached = !1;
        if (e) {
            this.triggerAttach()
        };
        return this.unmaskTrigger("triggerAttach");
    };
    HierarchicalView.prototype.attachComponents = function() {
        var e, t, n, r, o, i;
        for (o = this._components, i = [], n = 0, r = o.length; r > n; n++) {
            t = o[n];
            i.push(typeof (e = t.instance).componentDidAttach == "function" ? e.componentDidAttach() : void 0);
        }
        return i;
    };
    HierarchicalView.prototype.detachComponents = function() {
        var e, t, n, r, o, i;
        for (o = this._components, i = [], n = 0, r = o.length; r > n; n++) {
            t = o[n];
            i.push(typeof (e = t.instance).componentWillDetach == "function" ? e.componentWillDetach() : void 0);
        }
        return i;
    };
    return HierarchicalView;
}(Backbone.View);