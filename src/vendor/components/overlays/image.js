var r, o, i;

i = React.DOM.img;

o = require("classnames");

r = React.createClass({
    displayName: "Image",
    propTypes: {
        url: React.PropTypes.string.isRequired
    },
    _style: function() {
        return {
            maxWidth: this.state.maxWidth,
            maxHeight: this.state.maxHeight
        };
    },
    _maxHeight: function(e) {
        if (e.height > window.innerHeight) {
            return .9 * window.innerHeight;
        }
        return e.height;
    },
    _maxWidth: function(e) {
        if (e.width > window.innerWidth) {
            return .9 * window.innerWidth;
        }
        return e.width;
    },
    _handleImageDisplay: function(e) {
        var t;
        t = e.target;
        return this.setState({
            maxWidth: this._maxWidth(t),
            maxHeight: this._maxHeight(t),
            invisible: !1
        });
    },
    _classes: function() {
        return o({
            invisible: this.state.invisible
        });
    },
    getInitialState: function() {
        return {
            invisible: !0
        };
    },
    render: function() {
        return i({
            style: this._style(),
            className: this._classes(),
            src: this.props.url,
            onLoad: this._handleImageDisplay
        });
    }
});

module.exports = r;
