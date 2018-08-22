var r, o, i, s, a, u, l;

u = React.DOM;

s = u.div;

i = u.a;

a = u.img;

l = u.span;

r = React.createFactory(require("./image"));

o = React.createClass({
    displayName: "ImageOverlay",
    propTypes: {
        onClose: React.PropTypes.func.isRequired,
        url: React.PropTypes.string.isRequired,
        original: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            maxWidth: 0,
            maxHeight: 0
        };
    },
    componentDidMount: function() {
        return window.history.pushState({}, "image");
    },
    componentWillMount: function() {
        return window.addEventListener("popstate", this.props.onClose);
    },
    componentDidUnmount: function() {
        return window.removeEventListener("popstate", this.props.onClose);
    },
    render: function() {
        return s({
            className: "image-wrap"
        }, i({
            className: "image-link",
            href: this.props.original || this.props.url,
            onClick: this.props.onClose
        }, r({
            url: this.props.url
        }), l({
            className: "open-original"
        }, "Open original...")));
    }
});

module.exports = o;