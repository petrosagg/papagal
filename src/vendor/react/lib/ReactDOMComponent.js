"use strict";

function r(e) {
    if (e) {
        e.dangerouslySetInnerHTML != null && (v(e.children == null), v(typeof e.dangerouslySetInnerHTML == "object" && "__html" in e.dangerouslySetInnerHTML)), 
        v(e.style == null || typeof e.style == "object")
    };
}

function o(e, t, n, r) {
    var o = d.findReactContainerForID(e);
    if (o) {
        var i = o.nodeType === C ? o.ownerDocument : o;
        _(t, i);
    }
    r.getPutListenerQueue().enqueuePutListener(e, t, n);
}

function i(e) {
    A.call(D, e) || (v(S.test(e)), D[e] = !0);
}

function s(e) {
    i(e);
    this._tag = e;
    this._renderedChildren = null;
    this._previousStyleCopy = null;
    this._rootNodeID = null;
}

var a = require("./CSSPropertyOperations"), u = require("./DOMProperty"), l = require("./DOMPropertyOperations"), c = require("./ReactBrowserEventEmitter"), p = require("./ReactComponentBrowserEnvironment"), d = require("./ReactMount"), h = require("./ReactMultiChild"), f = require("./ReactPerf"), m = require("./Object.assign"), g = require("./escapeTextContentForBrowser"), v = require("./invariant"), b = (require("./isEventSupported"), 
require("./keyOf")), y = (require("./warning"), c.deleteListener), _ = c.listenTo, w = c.registrationNameModules, k = {
    string: !0,
    number: !0
}, x = b({
    style: null
}), C = 1, E = null, T = {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
}, S = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/, D = {}, A = {}.hasOwnProperty;

s.displayName = "ReactDOMComponent";

s.Mixin = {
    construct: function(e) {
        this._currentElement = e;
    },
    mountComponent: function(e, t, n) {
        this._rootNodeID = e;
        r(this._currentElement.props);
        var o = T[this._tag] ? "" : "</" + this._tag + ">";
        return this._createOpenTagMarkupAndPutListeners(t) + this._createContentMarkup(t, n) + o;
    },
    _createOpenTagMarkupAndPutListeners: function(e) {
        var t = this._currentElement.props, n = "<" + this._tag;
        for (var r in t) {
            if (t.hasOwnProperty(r)) {
                var i = t[r];
                if (i != null) {
                    if (w.hasOwnProperty(r)) {
                        o(this._rootNodeID, r, i, e);
                    } else {
                        if (r === x) {
                            i && (i = this._previousStyleCopy = m({}, t.style)), i = a.createMarkupForStyles(i)
                        };
                        var s = l.createMarkupForProperty(r, i);
                        if (s) {
                            n += " " + s
                        };
                    }
                }
            }
        }
        if (e.renderToStaticMarkup) {
            return n + ">";
        }
        var u = l.createMarkupForID(this._rootNodeID);
        return n + " " + u + ">";
    },
    _createContentMarkup: function(e, t) {
        var n = "";
        if (this._tag === "listing" || this._tag === "pre" || this._tag === "textarea") {
            n = "\n"
        };
        var r = this._currentElement.props, o = r.dangerouslySetInnerHTML;
        if (o != null) {
            if (o.__html != null) {
                return n + o.__html;
            }
        } else {
            var i = k[typeof r.children] ? r.children : null, s = i != null ? null : r.children;
            if (i != null) {
                return n + g(i);
            }
            if (s != null) {
                var a = this.mountChildren(s, e, t);
                return n + a.join("");
            }
        }
        return n;
    },
    receiveComponent: function(e, t, n) {
        var r = this._currentElement;
        this._currentElement = e;
        this.updateComponent(t, r, e, n);
    },
    updateComponent: function(e, t, n, o) {
        r(this._currentElement.props);
        this._updateDOMProperties(t.props, e);
        this._updateDOMChildren(t.props, e, o);
    },
    _updateDOMProperties: function(e, t) {
        var n, r, i, s = this._currentElement.props;
        for (n in e) {
            if (!s.hasOwnProperty(n) && e.hasOwnProperty(n)) {
                if (n === x) {
                    var a = this._previousStyleCopy;
                    for (r in a) {
                        if (a.hasOwnProperty(r)) {
                            i = i || {}, i[r] = ""
                        };
                    }
                    this._previousStyleCopy = null;
                } else if (w.hasOwnProperty(n)) {
                    y(this._rootNodeID, n);
                } else if (u.isStandardName[n] || u.isCustomAttribute(n)) {
                    E.deletePropertyByID(this._rootNodeID, n)
                };
            }
        }
        for (n in s) {
            var l = s[n], c = n === x ? this._previousStyleCopy : e[n];
            if (s.hasOwnProperty(n) && l !== c) {
                if (n === x) {
                    if (l) {
                        l = this._previousStyleCopy = m({}, l);
                    } else this._previousStyleCopy = null;
                    if (c) {
                        for (r in c) {
                            !c.hasOwnProperty(r) || l && l.hasOwnProperty(r) || (i = i || {}, i[r] = "");
                        }
                        for (r in l) {
                            if (l.hasOwnProperty(r) && c[r] !== l[r]) {
                                i = i || {}, i[r] = l[r]
                            };
                        }
                    } else i = l;
                } else if (w.hasOwnProperty(n)) {
                    o(this._rootNodeID, n, l, t);
                } else if (u.isStandardName[n] || u.isCustomAttribute(n)) {
                    E.updatePropertyByID(this._rootNodeID, n, l)
                };
            }
        }
        if (i) {
            E.updateStylesByID(this._rootNodeID, i)
        };
    },
    _updateDOMChildren: function(e, t, n) {
        var r = this._currentElement.props, o = k[typeof e.children] ? e.children : null, i = k[typeof r.children] ? r.children : null, s = e.dangerouslySetInnerHTML && e.dangerouslySetInnerHTML.__html, a = r.dangerouslySetInnerHTML && r.dangerouslySetInnerHTML.__html, u = o != null ? null : e.children, l = i != null ? null : r.children, c = o != null || s != null, p = i != null || a != null;
        if (u != null && l == null) {
            this.updateChildren(null, t, n);
        } else if (c && !p) {
            this.updateTextContent("")
        };
        if (i != null) {
            if (o !== i) {
                this.updateTextContent("" + i)
            };
        } else if (a != null) {
            if (s !== a) {
                E.updateInnerHTMLByID(this._rootNodeID, a)
            };
        } else if (l != null) {
            this.updateChildren(l, t, n)
        };
    },
    unmountComponent: function() {
        this.unmountChildren();
        c.deleteAllListeners(this._rootNodeID);
        p.unmountIDFromEnvironment(this._rootNodeID);
        this._rootNodeID = null;
    }
};

f.measureMethods(s, "ReactDOMComponent", {
    mountComponent: "mountComponent",
    updateComponent: "updateComponent"
});

m(s.prototype, s.Mixin, h.Mixin);

s.injection = {
    injectIDOperations: function(e) {
        s.BackendIDOperations = E = e;
    }
};

module.exports = s;
