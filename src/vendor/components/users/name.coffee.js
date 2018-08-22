var r, o;

o = React.DOM.span;

r = React.createClass({
    displayName: "UserName",
    getDefaultProps: function() {
        return {
            className: "user-name"
        };
    },
    componentDidMount: function() {
        return this.props.user.on("change:name", this.update);
    },
    componentWillUnmount: function() {
        return this.props.user.on("change:name", this.update);
    },
    render: function() {
        return o({
            className: this.props.className
        }, this.props.user.get("name"));
    },
    update: function() {
        return this.forceUpdate();
    }
});

module.exports = r;