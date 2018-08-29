"use strict";

var r = require("./CSSPropertyOperations"), o = require("./DOMChildrenOperations"), i = require("./DOMPropertyOperations"), s = require("./ReactMount"), a = require("./ReactPerf"), u = require("./invariant"), l = require("./setInnerHTML"), c = {
    dangerouslySetInnerHTML: "`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.",
    style: "`style` must be set using `updateStylesByID()`."
}, p = {
    updatePropertyByID: function(e, t, n) {
        var r = s.getNode(e);
        u(!c.hasOwnProperty(t));
        if (n != null) {
            i.setValueForProperty(r, t, n);
        } else i.deleteValueForProperty(r, t);
    },
    deletePropertyByID: function(e, t, n) {
        var r = s.getNode(e);
        u(!c.hasOwnProperty(t));
        i.deleteValueForProperty(r, t, n);
    },
    updateStylesByID: function(e, t) {
        var n = s.getNode(e);
        r.setValueForStyles(n, t);
    },
    updateInnerHTMLByID: function(e, t) {
        var n = s.getNode(e);
        l(n, t);
    },
    updateTextContentByID: function(e, t) {
        var n = s.getNode(e);
        o.updateTextContent(n, t);
    },
    dangerouslyReplaceNodeWithMarkupByID: function(e, t) {
        var n = s.getNode(e);
        o.dangerouslyReplaceNodeWithMarkup(n, t);
    },
    dangerouslyProcessChildrenUpdates: function(e, t) {
        for (var n = 0; n < e.length; n++) {
            e[n].parentNode = s.getNode(e[n].parentID);
        }
        o.processUpdates(e, t);
    }
};

a.measureMethods(p, "ReactDOMIDOperations", {
    updatePropertyByID: "updatePropertyByID",
    deletePropertyByID: "deletePropertyByID",
    updateStylesByID: "updateStylesByID",
    updateInnerHTMLByID: "updateInnerHTMLByID",
    updateTextContentByID: "updateTextContentByID",
    dangerouslyReplaceNodeWithMarkupByID: "dangerouslyReplaceNodeWithMarkupByID",
    dangerouslyProcessChildrenUpdates: "dangerouslyProcessChildrenUpdates"
});

module.exports = p;
