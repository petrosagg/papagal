!function(n, r) {
    if (typeof define == "function" && define.amd) {
        define([ "react", "backbone", "underscore" ], r);
    } else if (typeof module != "undefined" && module.exports) {
        module.exports = r(require("react"), require("backbone"), require("underscore"));
    } else r(n.React, n.Backbone, n._);
}(this, function(e, t, n) {
    "use strict";
    function r(e, t, n) {
        this.state = {};
        this.component = e;
        var r, o, i = n || e.props || {};
        r = e.overrideModel && typeof e.overrideModel == "function" ? e.overrideModel() : i.model;
        o = e.overrideCollection && typeof e.overrideCollection == "function" ? e.overrideCollection() : i.collection;
        this.setModels(r, t);
        this.setCollections(o, t);
    }
    t.React || (t.React = {});
    t.React.Component || (t.React.Component = {});
    var o = t.React.Component.mixin = {
        childContextTypes: {
            hasParentBackboneMixin: e.PropTypes.bool.isRequired,
            parentModel: e.PropTypes.any,
            parentCollection: e.PropTypes.any
        },
        contextTypes: {
            hasParentBackboneMixin: e.PropTypes.bool,
            parentModel: e.PropTypes.any,
            parentCollection: e.PropTypes.any
        },
        getChildContext: function() {
            return {
                hasParentBackboneMixin: !0,
                parentModel: this.getModel(),
                parentCollection: this.getCollection()
            };
        },
        componentDidMount: function() {
            this.setElement(e.findDOMNode(this));
        },
        componentDidUpdate: function() {
            this.setElement(e.findDOMNode(this));
        },
        getInitialState: function() {
            var e = {};
            this.wrapper || (this.wrapper = new r(this, e));
            return e;
        },
        componentWillMount: function() {
            this.wrapper || (this.wrapper = new r(this));
        },
        componentWillUnmount: function() {
            if (this.wrapper) {
                this.wrapper.stopListening(), delete this.wrapper
            };
        },
        componentWillReceiveProps: function(e) {
            var t = e.model, n = e.collection;
            if (this.wrapper.model && t) {
                if (this.wrapper.model !== t) {
                    this.wrapper.stopListening(), this.wrapper = new r(this, void 0, e)
                };
            } else if (t) {
                this.wrapper = new r(this, void 0, e)
            };
            if (this.wrapper.collection && n) {
                if (this.wrapper.collection !== n) {
                    this.wrapper.stopListening(), this.wrapper = new r(this, void 0, e)
                };
            } else if (n) {
                this.wrapper = new r(this, void 0, e)
            };
        },
        $: function() {
            var t;
            if (this.$el) {
                t = this.$el.find.apply(this.$el, arguments);
            } else {
                var n = e.findDOMNode(this);
                t = n.querySelector.apply(n, arguments);
            }
            return t;
        },
        getCollection: function() {
            return this.wrapper.collection || this.context.parentCollection;
        },
        getModel: function() {
            return this.wrapper.model || this.context.parentModel;
        },
        setElement: function(e) {
            if (e && t.$ && e instanceof t.$) {
                if (e.length > 1) {
                    throw new Error("You can only assign one element to a component");
                }
                this.el = e[0];
                this.$el = e;
            } else if (e) {
                this.el = e, t.$ && (this.$el = t.$(e))
            };
            return this;
        }
    };
    n.extend(r.prototype, t.Events, {
        onError: function(e, t, n) {
            n.silent || this.component.setState({
                isRequesting: !1,
                hasError: !0,
                error: t
            });
        },
        onInvalid: function(e, t, n) {
            n.silent || this.component.setState({
                isInvalid: !0
            });
        },
        onRequest: function(e, t, n) {
            n.silent || this.component.setState({
                isRequesting: !0,
                hasError: !1,
                isInvalid: !1
            });
        },
        onSync: function(e, t, n) {
            n.silent || this.component.setState({
                isRequesting: !1
            });
        },
        setModels: function(e, t, r) {
            if (typeof e != "undefined" && (e.attributes || typeof e == "object" && n.values(e)[0].attributes)) {
                this.model = e, this.setStateBackbone(e, void 0, t, r), this.startModelListeners(e)
            };
        },
        setCollections: function(e, t, r) {
            if (typeof e != "undefined" && (e.models || typeof e == "object" && n.values(e)[0].models)) {
                this.collection = e, this.setStateBackbone(e, void 0, t, r), this.startCollectionListeners(e)
            };
        },
        setStateBackbone: function(e, t, n, r) {
            if (e.models || e.attributes) {
                this.setState.apply(this, arguments);
            } else for (t in e) {
                this.setStateBackbone(e[t], t, n);
            }
        },
        setState: function(e, t, r, o) {
            var i = {}, s = e.toJSON ? e.toJSON() : e;
            if (t) {
                i[t] = s;
            } else if (e.models) {
                i.collection = s;
            } else i.model = s;
            if (r) {
                n.extend(r, i);
            } else if (o) {
                this.nextState = n.extend(this.nextState || {}, i);
                n.defer(n.bind(function() {
                    if (this.nextState) {
                        this.component.setState(this.nextState), this.nextState = null
                    };
                }, this));
            } else this.component.setState(i);
        },
        startCollectionListeners: function(e, t) {
            e || (e = this.collection);
            if (e) {
                if (e.models) {
                    this.listenTo(e, "add remove change sort reset", n.partial(this.setStateBackbone, e, t, void 0, !0)).listenTo(e, "error", this.onError).listenTo(e, "request", this.onRequest).listenTo(e, "sync", this.onSync);
                } else if (typeof e == "object") {
                    for (t in e) {
                        if (e.hasOwnProperty(t)) {
                            this.startCollectionListeners(e[t], t)
                        };
                    }
                }
            }
        },
        startModelListeners: function(e, t) {
            e || (e = this.model);
            if (e) {
                if (e.attributes) {
                    this.listenTo(e, "change", n.partial(this.setStateBackbone, e, t, void 0, !0)).listenTo(e, "error", this.onError).listenTo(e, "request", this.onRequest).listenTo(e, "sync", this.onSync).listenTo(e, "invalid", this.onInvalid);
                } else if (typeof e == "object") {
                    for (t in e) {
                        this.startModelListeners(e[t], t);
                    }
                }
            }
        }
    });
    return o;
});
