var r, o;

r = require("react");

o = r.DOM;

module.exports = r.createClass({
    render: function() {
        return o.div({
            className: "loader",
            style: {
                textAlign: "center"
            }
        }, o.div({
            className: "box1"
        }), o.div({
            className: "box2"
        }), o.div({
            className: "box3"
        }), o.div({
            className: "box4"
        }), o.div({
            className: "box5"
        }));
    }
});