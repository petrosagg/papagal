"use strict";

var r = require("./EventConstants"), o = require("./LocalEventTrapMixin"), i = require("./ReactBrowserComponentMixin"), s = require("./ReactClass"), a = require("./ReactElement"), u = a.createFactory("iframe"), l = s.createClass({
    displayName: "ReactDOMIframe",
    tagName: "IFRAME",
    mixins: [ i, o ],
    render: function() {
        return u(this.props);
    },
    componentDidMount: function() {
        this.trapBubbledEvent(r.topLevelTypes.topLoad, "load");
    }
});

module.exports = l;
