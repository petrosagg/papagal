var r;

r = React.DOM.div;

module.exports = React.createClass({
    displayName: "NewTabIcon",
    render: function() {
        if (this.props.avatar) {
            return r({
                className: "new-tab-avatar",
                title: this.props.title,
                style: {
                    backgroundImage: "url(" + this.props.avatar + ")"
                }
            });
        }
        return r({
            className: "new-tab-icon",
            title: this.props.title
        }, r({
            className: "fa fa-2x " + this.props["class"] + " join-type-icon"
        }), this.props.open ? r({
            className: "fa fa-check-square joined-icon"
        }) : void 0);
    }
});