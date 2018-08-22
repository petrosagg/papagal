"use strict";

var r = require("./EventConstants"), o = require("./LocalEventTrapMixin"), i = require("./ReactBrowserComponentMixin"), s = require("./ReactClass"), a = require("./ReactElement"), u = a.createFactory("img"), l = s.createClass({
    displayName: "ReactDOMImg",
    tagName: "IMG",
    mixins: [ i, o ],
    render: function() {
        return u(this.props);
    },
    componentDidMount: function() {
        this.trapBubbledEvent(r.topLevelTypes.topLoad, "load");
        this.trapBubbledEvent(r.topLevelTypes.topError, "error");
    }
});

module.exports = l;