var r;

r = React.DOM.img;

module.exports = React.createClass({
    render: function() {
        return r({
            alt: this.props.alt,
            className: "thread-avatar thread-comment-avatar",
            src: this.props.src
        });
    }
});
