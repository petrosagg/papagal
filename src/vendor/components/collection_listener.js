var r;

r = React.createClass({
    displayName: "CollectionListener",
    componentDidMount: function() {
        return this.props.collection.on("add remove", this.update);
    },
    componentWillUnmount: function() {
        return this.props.collection.off("add remove", this.update);
    },
    render: function() {
        return this.props.renderContent(this.props.collection);
    },
    update: function() {
        return this.forceUpdate();
    }
});

module.exports = r;
