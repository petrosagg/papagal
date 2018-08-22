"use strict";

var r = require("./EventConstants"), o = require("./LocalEventTrapMixin"), i = require("./ReactBrowserComponentMixin"), s = require("./ReactClass"), a = require("./ReactElement"), u = a.createFactory("form"), l = s.createClass({
    displayName: "ReactDOMForm",
    tagName: "FORM",
    mixins: [ i, o ],
    render: function() {
        return u(this.props);
    },
    componentDidMount: function() {
        this.trapBubbledEvent(r.topLevelTypes.topReset, "reset");
        this.trapBubbledEvent(r.topLevelTypes.topSubmit, "submit");
    }
});

module.exports = l;
