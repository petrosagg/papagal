var r, o;

o = React.DOM;

r = React.createFactory(require("./loader_box"));

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            threshold: 10
        };
    },
    _loader: function() {
        if (this.props.loader) {
            return this.props.loader;
        }
        if (this.props.loader !== !1) {
            return r;
        }
        return;
    },
    componentDidMount: function() {
        return this.maybeLoadMore();
    },
    maybeLoadMore: function() {
        if (this.distanceFromBottom() < this.props.threshold) {
            return setTimeout(function(e) {
                return function() {
                    return e.props.loadMore();
                };
            }(this), 0);
        }
        return;
    },
    componentDidUpdate: function() {
        return this.maybeLoadMore();
    },
    loader: function() {
        var e;
        if ((e = this._loader(null)) && this.props.hasMore) {
            return e();
        }
        return;
    },
    distanceFromBottom: function() {
        var e;
        e = React.findDOMNode(this);
        return e.scrollHeight - (e.scrollTop + e.offsetHeight);
    },
    render: function() {
        return o.div({
            className: this.props.className,
            id: this.props.id,
            style: {
                overflowY: "auto",
                width: "100%"
            },
            onScroll: this.maybeLoadMore
        }, o.div({
            className: "scroller"
        }, o.div({}, this.props.children), o.div({}, this.loader())));
    }
});
