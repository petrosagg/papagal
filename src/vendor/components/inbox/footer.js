var r, o, i, s, a, u, l, c, p, d, h, f, m, g;

m = React.DOM;

d = m.div;

g = m.ul;

f = m.li;

c = m.a;

h = m.img;

p = require("classnames");

r = React.createFactory(React.addons.CSSTransitionGroup);

o = React.createFactory(require("../animations/carousel"));

a = React.createClass({
    displayName: "FooterMessage",
    render: function() {
        return d({
            className: "inbox-footer-message"
        }, d({
            className: "inbox-footer-message-avatar dummy-avatar-" + this.props.user
        }), d({
            className: "inbox-footer-message-title"
        }, this.props.title), d({
            className: "inbox-footer-message-content"
        }, d({
            className: "inbox-footer-message-user-avatar type-icon " + this.props.type
        }), this.props.meta));
    }
});

u = React.createFactory(a);

i = React.createClass({
    displayName: "FooterActions",
    _classes: function(e) {
        return [ e, "inbox-footer-button" ].join(" ");
    },
    _openSettings: function() {
        return Flowdock.app.manager.openFlowSettings(Flowdock.app.manager.currentFlow, "integrations");
    },
    render: function() {
        return g({
            className: "inbox-footer-actions"
        }, f({}, c({
            className: this._classes("primary-button"),
            onClick: this._openSettings
        }, "Add integrations")), this.props.isLast ? void 0 : f({}, c({
            className: this._classes("secondary-button"),
            onClick: this.props.toNextSlide
        }, "Next")));
    }
});

s = React.createFactory(i);

l = React.createClass({
    displayName: "InboxFooter",
    getInitialState: function() {
        return {
            currentSlide: 0
        };
    },
    getDefaultProps: function() {
        return {
            compact: !1,
            slides: [ {
                super: "The team inbox",
                title: "See your team work",
                subtitle: "The shared team inbox helps you stay up to date about what's actually happening."
            }, {
                title: "Track projects",
                subtitle: "See what's planned. Project management, backlog tools and tasks in CA Agile Central, Trello, JIRA and many other tools."
            }, {
                title: "Build software",
                subtitle: "See how your software is being built. Follow version control, issue tracking, continuous integration and deployments."
            }, {
                title: "Track online media",
                subtitle: "Follow what your customers are talking about on Twitter and other social media channels. Coordinate your response."
            } ]
        };
    },
    moveToSlide: function(e) {
        if (this.animating) {
            return void 0;
        }
        this.setState({
            currentSlide: e
        });
        this.animating = !0;
        return setTimeout(function(e) {
            return function() {
                return e.animating = !1;
            };
        }(this), 600);
    },
    render: function() {
        var e, t, n, i, a;
        return r({
            transitionName: "toggle"
        }, this.props.compact ? d({
            key: 1,
            className: "inbox-footer-small"
        }, d({
            className: "inbox-footer-content-wrapper-small"
        }, d({
            className: "inbox-footer-content-small"
        }, d({
            className: "inbox-footer-title-small"
        }, this.props.title), d({
            className: "inbox-footer-subtitle-small"
        }, this.props.subtitle), this.props.actions ? g({
            className: "inbox-footer-actions"
        }, function() {
            var t, n, r, o;
            for (r = this.props.actions, o = [], i = t = 0, n = r.length; n > t; i = ++t) {
                e = r[i];
                o.push(f({
                    key: "action-" + i
                }, e));
            }
            return o;
        }.call(this)) : void 0))) : (n = this.props.slides[this.state.currentSlide], d({
            key: 2,
            className: "inbox-footer"
        }, d({
            className: "inbox-footer-content-wrapper"
        }, d({
            className: "inbox-footer-content"
        }, g({
            className: "carousel-radio"
        }, function() {
            var e, n, r, o;
            for (r = this.props.slides, o = [], i = e = 0, n = r.length; n > e; i = ++e) {
                a = r[i];
                t = p({
                    "carousel-radio-button": !0,
                    selected: i === this.state.currentSlide
                });
                o.push(f({
                    key: "slide-" + i
                }, c({
                    className: t,
                    onClick: this.moveToSlide.bind(this, i)
                })));
            }
            return o;
        }.call(this)), o({
            component: "div",
            className: "carousel"
        }, d({
            key: this.state.currentSlide,
            className: "carousel-slide"
        }, d({
            className: "inbox-footer-super"
        }, "Use the inbox to"), d({
            className: "inbox-footer-title"
        }, n.title), d({
            className: "inbox-footer-subtitle"
        }, n.subtitle), s({
            slide: n,
            isLast: this.state.currentSlide === this.props.slides.length - 1,
            toNextSlide: this.moveToSlide.bind(this, this.state.currentSlide + 1)
        }))))))));
    }
});

module.exports = l;
