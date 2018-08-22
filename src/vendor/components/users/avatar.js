var r, o, i, s;

s = React.DOM;

i = s.img;

o = s.div;

r = require("classnames");

module.exports = React.createClass({
    displayName: "Avatar",
    propTypes: {
        size: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            size: 72
        };
    },
    componentDidMount: function() {
        return this.props.model.on("change", function() {
            if (this.isMounted()) {
                return this.forceUpdate();
            }
            return;
        }, this);
    },
    componentWillUnmount: function() {
        if (this.userCardOpen()) {
            this.userCard.destructor()
        };
        return this.props.model.off("change", null, this);
    },
    userCardOpen: function() {
        return this.userCard != null;
    },
    openUserCard: function() {
        if (this.props.userCard === !1 || this.userCardOpen() || Flowdock.mobile) {
            return void 0;
        }
        this.userCard = new Views.Chat.UserCard({
            model: this.props.model,
            me: this.props.model.collection.flow.me()
        });
        this.userCard.once("destructor", function(e) {
            return function() {
                return e.userCard = void 0;
            };
        }(this));
        return this.placeUserCard(this.userCard.render({
            alignTop: !1
        }));
    },
    getPosition: function() {
        return $(this.getDOMNode()).offset();
    },
    placeUserCard: function(e) {
        var t, n, r, o, i, s, a;
        t = $(this.getDOMNode());
        $("body").append(e.$el.css({
            visibility: "hidden"
        }));
        a = e.$el.width();
        i = e.$el.height();
        n = t.height();
        o = t.width();
        r = this.getPosition();
        s = {
            top: r.top + n > $(window).height() ? r.top - i : r.top + n,
            left: r.left + a > $(window).width() ? r.left + o - a : r.left
        };
        return e.$el.css({
            top: s.top + "px",
            left: s.left + "px",
            visibility: "visible"
        });
    },
    status: function() {
        var e;
        e = this.props.model.get("status");
        if (e && e.length > 0) {
            return e;
        }
        return null;
    },
    title: function() {
        if (this.status()) {
            return this.props.model.get("nick") + ': "' + this.status() + '"';
        }
        return this.props.model.get("nick");
    },
    render: function() {
        var e, t, n;
        this.props.useCSS ? (n = "url(" + this.props.model.get("avatar") + this.props.size + ")", 
        t = {
            backgroundImage: n
        }) : e = i({
            className: "user-avatar-image",
            src: "" + this.props.model.avatar(this.props.size)
        });
        return o({
            className: r({
                "user-avatar": !0,
                "tipsy-tooltip": !0
            }),
            title: this.title(),
            onClick: this.openUserCard,
            style: t
        }, e);
    }
});
