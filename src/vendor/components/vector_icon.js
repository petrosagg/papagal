var r, o, i, s, a;

s = React.DOM;

a = s.svg;

o = s.g;

i = s.path;

r = require("classnames");

module.exports = React.createClass({
    displayName: "VectorIcon",
    propTypes: {
        boxWidth: React.PropTypes.number,
        boxHeight: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            boxWidth: 128,
            boxHeight: 128
        };
    },
    render: function() {
        var e;
        e = {
            className: r("vector-icon", this.props.className),
            x: "0px",
            y: "0px",
            viewBox: "0 0 " + this.props.boxWidth + " " + this.props.boxHeight,
            "enable-background": "new 0 0 " + this.props.boxWidth + " " + this.props.boxHeight,
            "xml:space": "preserve"
        };
        return a(e, o({}, i({
            className: "vector-icon-path",
            d: this.props.path
        })));
    }
});