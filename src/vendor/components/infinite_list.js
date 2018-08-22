var r, o, i, s, a, u;

a = React.DOM;

i = a.div;

s = a.li;

u = a.ul;

o = require("underscore");

r = React.createClass({
    displayName: "InfiniteList",
    getInitialState: function() {
        return {
            offset: 0
        };
    },
    getDefaultProps: function() {
        return {
            component: "ul",
            pageLength: 60,
            items: [],
            itemHeight: 60,
            renderItem: function() {
                return s(null, "Item");
            },
            renderEmpty: function() {
                return i({
                    className: "infinite-empty"
                }, i({
                    className: "infinite-empty-title"
                }, "There are no items in this list."), i({
                    className: "infinite-empty-subtitle"
                }, "Try creating a new one."));
            }
        };
    },
    shouldComponentUpdate: function(e, t) {
        return this.state.offset !== t.offset || this.props.items !== e.items || !this.props.items.length;
    },
    render: function() {
        var e;
        e = o.extend({
            ref: "list",
            onScroll: this.onScroll
        }, this.props);
        return React.createElement(this.props.component, e, this.renderSpaceAbove(), this.renderItems(), this.renderSpaceBelow());
    },
    renderItems: function() {
        var e, t;
        if (this.props.items.length === 0) {
            return this.props.renderEmpty();
        }
        t = Math.max(0, this.state.offset - this.props.pageLength);
        e = Math.min(this.props.items.length, this.state.offset + this.props.pageLength);
        return this.props.items.slice(t, e).map(function(e) {
            return function(n, r) {
                return e.props.renderItem(n, r + t);
            };
        }(this));
    },
    renderSpaceAbove: function() {
        var e;
        e = Math.max(0, this.state.offset - this.props.pageLength);
        return this.renderSpace(e * this.props.itemHeight);
    },
    renderSpaceBelow: function() {
        var e;
        e = Math.max(0, this.props.items.length - this.state.offset - this.props.pageLength);
        return this.renderSpace(e * this.props.itemHeight);
    },
    renderSpace: function(e) {
        return i({
            className: "infinite-list-space",
            style: {
                height: e
            }
        });
    },
    getScrollBottom: function() {
        return React.findDOMNode(this).scrollTop + window.innerHeight;
    },
    onScroll: function(e) {
        var t, n;
        t = this.props.pageLength * this.props.itemHeight;
        n = this.getScrollBottom();
        return this.setState({
            offset: Math.floor(this.getScrollBottom() / t) * this.props.pageLength
        });
    },
    getListStart: function() {
        return Math.max(0, this.state.offset - this.props.pageLength);
    },
    getPageTop: function(e) {
        return e * this.props.itemHeight + this.props.scrollOffset;
    }
});

module.exports = r;
