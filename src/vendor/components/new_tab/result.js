var r, o, i, s, a, u, l, c, p, d, h;

p = React.DOM;

s = p.a;

a = p.div;

l = p.img;

c = p.li;

d = p.span;

h = p.ul;

u = p.i;

o = React.createFactory(require("./icon"));

i = require("underscore");

r = require("backbone-react-component");

module.exports = React.createClass({
    displayName: "NewTabResult",
    mixins: [ r ],
    createTimestamp: function(e) {
        return d({
            className: "last-message",
            title: "Last message sent " + e.calendar()
        }, " " + e.fromNow());
    },
    render: function() {
        var e;
        e = i.extend({
            className: "new-tab-item",
            key: this.props.presenter.id()
        }, this.props);
        return c(e, s({
            href: this.props.presenter.url(),
            onClick: this.onClick
        }, o(this.props.presenter.icon()), a({
            className: "name-row"
        }, d({
            className: "name"
        }, this.props.presenter.name()), " ", d({
            className: "name-specifier"
        }, "(" + this.props.presenter.specifier() + ")"), this.props.presenter.lastMessageAt().valueOf() !== 0 ? this.createTimestamp(this.props.presenter.lastMessageAt()) : undefined), a({
            className: "description"
        }, this.props.presenter.description())));
    },
    onClick: function(e) {
        var t;
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.spotlight_search_result_click);
        if (e != null) {
            e.preventDefault()
        };
        if (e != null && (t = e.nativeEvent) != null) {
            t.stopImmediatePropagation()
        };
        return this.props.onClick && this.props.onClick();
    }
});
