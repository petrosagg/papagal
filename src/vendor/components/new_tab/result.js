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
            href: this.props.presenter.url()
        }, o(this.props.presenter.icon()), a({
            className: "name-row"
        }, d({
            className: "name"
        }, this.props.presenter.name()), " ", d({
            className: "name-specifier"
        }, "(" + this.props.presenter.specifier() + ")"), 0 !== this.props.presenter.lastMessageAt().valueOf() ? this.createTimestamp(this.props.presenter.lastMessageAt()) : void 0), a({
            className: "description"
        }, this.props.presenter.description())));
    }
});
