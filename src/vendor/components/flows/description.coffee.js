var r, o, i, s;

s = React.DOM;

i = s.div;

o = s.a;

r = React.createClass({
    displayName: "FlowDescription",
    getDefaultProps: function() {
        return {
            className: "flow-description"
        };
    },
    componentDidMount: function() {
        return this.props.flow.on("change:description", this.update);
    },
    componentWillUnmount: function() {
        return this.props.flow.off("change:description", this.update);
    },
    render: function() {
        return i({
            className: this.props.className
        }, this.props.flow.get("description").length > 0 ? this.props.flow.get("description") : this.props.children, " ", o({
            className: "edit-description-link",
            onClick: this.openFlowSettings
        }, "(edit)"));
    },
    update: function() {
        return this.forceUpdate();
    },
    openFlowSettings: function() {
        return Flowdock.app.manager.openFlowSettings(this.props.flow);
    }
});

module.exports = r;