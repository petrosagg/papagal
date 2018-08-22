var r, o;

r = React.createFactory(React.addons.CSSTransitionGroup);

o = React.createClass({
    displayName: "Carousel",
    render: function() {
        return r(_.extend(this.props, {
            transitionName: "carousel"
        }), this.props.children);
    }
});

module.exports = o;