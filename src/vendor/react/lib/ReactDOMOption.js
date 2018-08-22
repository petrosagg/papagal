"use strict";

var r = require("./ReactBrowserComponentMixin"), o = require("./ReactClass"), i = require("./ReactElement"), s = (require("./warning"), 
i.createFactory("option")), a = o.createClass({
    displayName: "ReactDOMOption",
    tagName: "OPTION",
    mixins: [ r ],
    componentWillMount: function() {},
    render: function() {
        return s(this.props, this.props.children);
    }
});

module.exports = a;