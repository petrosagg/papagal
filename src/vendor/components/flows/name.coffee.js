var r, o;

o = React.DOM.span;

r = React.createClass({
    displayName: "FlowName",
    getDefaultProps: function() {
        return {
            className: "flow-name"
        };
    },
    componentDidMount: function() {
        return this.props.flow.on("change:name", this.update);
    },
    componentWillUnmount: function() {
        return this.props.flow.off("change:name", this.update);
    },
    render: function() {
        return o({
            className: this.props.className
        }, this.props.flow.get("name"));
    },
    update: function() {
        return this.forceUpdate();
    }
});

module.exports = r;
