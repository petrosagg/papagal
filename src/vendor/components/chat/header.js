var r, o, i, s, a, u, l, c, p, d, h, f;

s = React.createFactory(require("components/flows/name.coffee"));

i = React.createFactory(require("components/flows/description.coffee"));

a = React.createFactory(require("components/flows/privacy.coffee"));

u = React.createFactory(require("components/users/name.coffee"));

r = React.createFactory(React.addons.CSSTransitionGroup);

h = React.DOM;

p = h.div;

l = h.a;

f = h.ul;

d = h.li;

c = h.br;

o = React.createClass({
    displayName: "ChatHeader",
    getDefaultProps: function() {
        return {
            compact: !1
        };
    },
    render: function() {
        var e, t;
        e = this.props.flow.isPrivate();
        if (e) {
            t = this.props.flow.otherParty()
        };
        return r({
            transitionName: "toggle"
        }, this.props.compact ? p({
            key: 1,
            className: "chat-header-small"
        }, p({
            className: "chat-header-content-wrapper-small"
        }, p({
            className: "chat-header-content-small"
        }, e ? [ p({
            key: "chat-header-super",
            className: "chat-header-super"
        }, "Need to keep it confidential?"), p({
            key: "chat-header-title-small",
            className: "chat-header-title-small"
        }, this.privateHeaderTitle(t)), p({
            key: "chat-header-subtitle-small",
            className: "chat-header-subtitle-small"
        }, this.privateHeaderSubtitle(t)) ] : [ p({
            key: "chat-header-super",
            className: "chat-header-super"
        }, "Welcome to your brand new flow!"), p({
            key: "chat-header-title-small",
            className: "chat-header-title-small"
        }, "The ", s({
            flow: this.props.flow
        }), " flow's chat starts here."), p({
            key: "chat-header-subtitle-small",
            className: "chat-header-subtitle-small"
        }, i({
            flow: this.props.flow
        }, "You haven't set up a description for this flow yet.")), p({
            key: "chat-header-privacy-small",
            className: "chat-header-privacy-small"
        }, a({
            flow: this.props.flow
        })), f({
            key: "chat-header-actions",
            className: "chat-header-actions"
        }, d({}, l({
            className: "primary-button invite-team-button",
            onClick: this.openPeopleManager
        }, "Invite your team"))) ]))) : p({
            key: 2,
            className: "chat-header"
        }, p({
            className: "chat-header-content-wrapper"
        }, p({
            className: "chat-header-content"
        }, e ? [ p({
            key: "chat-header-super",
            className: "chat-header-super"
        }, "Need to keep it confidential?"), p({
            key: "chat-header-title",
            className: "chat-header-title"
        }, this.privateHeaderTitle(t)), p({
            key: "chat-header-subtitle",
            className: "chat-header-subtitle"
        }, this.privateHeaderSubtitle(t)) ] : [ p({
            key: "chat-header-super",
            className: "chat-header-super"
        }, "Welcome to your brand new flow!"), p({
            key: "chat-header-title",
            className: "chat-header-title"
        }, "The ", s({
            flow: this.props.flow
        }), " flow's chat starts here."), p({
            key: "chat-header-subtitle",
            className: "chat-header-subtitle"
        }, i({
            flow: this.props.flow
        }, "You haven't set up a description for this flow yet.")), p({
            key: "chat-header-privacy",
            className: "chat-header-privacy"
        }, a({
            flow: this.props.flow
        })), f({
            className: "chat-header-actions"
        }, d({}, l({
            className: "primary-button invite-team-button",
            onClick: this.openPeopleManager
        }, "Invite your team"))) ]))));
    },
    openPeopleManager: function() {
        return Flowdock.app.manager.openFlowSettings(this.props.flow, "preferences?add_people=true");
    },
    privateHeaderTitle: function(e) {
        return [ "This chat is between you and ", u({
            user: e,
            className: "chat-header-user-name"
        }), "." ];
    },
    privateHeaderSubtitle: function(e) {
        return "1-to-1 conversations are private. Other people can't join this conversation.";
    }
});

module.exports = o;
