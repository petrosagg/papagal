var r, o, i, s;

s = React.DOM;

i = s.div;

o = s.a;

r = React.createClass({
    displayName: "FlowPrivacy",
    getDefaultProps: function() {
        return {
            className: "flow-privacy"
        };
    },
    componentDidMount: function() {
        return this.props.flow.on("change:access_mode", this.update);
    },
    componentWillUnmount: function() {
        return this.props.flow.off("change:access_mode", this.update);
    },
    render: function() {
        return i({
            className: this.props.className
        }, this.props.flow.get("access_mode") === "organization" ? "Anyone in the " + this.props.flow.get("organization").name + " organization can join this flow. " : "This flow is invitation-only. ", o({
            className: "edit-privacy-link",
            onClick: this.openPeopleManager
        }, "(edit)"));
    },
    update: function() {
        return this.forceUpdate();
    },
    openPeopleManager: function() {
        return Flowdock.app.manager.openFlowSettings(this.props.flow, "preferences");
    }
});

module.exports = r;
