var r, o, i, s;

s = React.DOM;

i = s.div;

o = s.button;

r = React.createClass({
    displayName: "ListHeader",
    getInitialState: function() {
        return {
            sortBy: "newest"
        };
    },
    getDefaultProps: function() {
        return {
            setSortBy: function() {}
        };
    },
    handleClick: function(e) {
        if (this.props.setSortBy(e)) {
            return this.setState({
                sortBy: e
            });
        }
        return;
    },
    sortByOldest: function() {
        return this.handleClick("oldest");
    },
    sortByNewest: function() {
        return this.handleClick("newest");
    },
    sortByRelevance: function() {
        return this.handleClick("relevance");
    },
    render: function() {
        return i({}, o({
            onClick: this.sortByNewest,
            className: this.state.sortBy === "newest" ? "search-list-button-selected" : "search-list-button"
        }, "Newest"), o({
            type: "submit",
            onClick: this.sortByOldest,
            className: this.state.sortBy === "oldest" ? "search-list-button-selected" : "search-list-button"
        }, "Oldest"), o({
            type: "submit",
            onClick: this.sortByRelevance,
            className: this.state.sortBy === "relevance" ? "search-list-button-selected" : "search-list-button"
        }, "Relevance"));
    }
});

module.exports = r;