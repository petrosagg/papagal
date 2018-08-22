"use strict";

var r = require("./DOMPropertyOperations"), o = require("./ReactComponentBrowserEnvironment"), i = require("./ReactDOMComponent"), s = require("./Object.assign"), a = require("./escapeTextContentForBrowser"), u = function(e) {};

s(u.prototype, {
    construct: function(e) {
        this._currentElement = e;
        this._stringText = "" + e;
        this._rootNodeID = null;
        this._mountIndex = 0;
    },
    mountComponent: function(e, t, n) {
        this._rootNodeID = e;
        var o = a(this._stringText);
        if (t.renderToStaticMarkup) {
            return o;
        }
        return "<span " + r.createMarkupForID(e) + ">" + o + "</span>";
    },
    receiveComponent: function(e, t) {
        if (e !== this._currentElement) {
            this._currentElement = e;
            var n = "" + e;
            if (n !== this._stringText) {
                this._stringText = n, i.BackendIDOperations.updateTextContentByID(this._rootNodeID, n)
            };
        }
    },
    unmountComponent: function() {
        o.unmountIDFromEnvironment(this._rootNodeID);
    }
});

module.exports = u;