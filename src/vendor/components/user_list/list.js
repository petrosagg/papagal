var r, o, i, s, a, u, l;

i = require("react");

l = i.DOM;

o = i.createFactory(require("./me"));

s = i.createFactory(require("components/scroller"));

a = i.createFactory(require("components/view_wrapper"));

r = i.createFactory(require("components/loader"));

u = require("classnames");

module.exports = i.createClass({
    getDefaultProps: function() {
        return {
            show: 20
        };
    },
    getInitialState: function() {
        return {
            show: this.props.show,
            online: this._collection([ "active", "idle" ], 0),
            offline: this._collection([ "offline" ], 0)
        };
    },
    _recap: function() {
        var e, t;
        t = this.state.show > this.state.online.filtered.length ? this.state.online.filtered.length : this.state.online;
        if (t !== this.state.online.capped.length) {
            this.state.online.capped.resize(t)
        };
        e = this.state.show - t;
        if (e !== this.state.offline.capped.length) {
            return this.state.offline.capped.resize(e);
        }
        return;
    },
    _collection: function(e, t) {
        var n, r, o, i;
        if (this._unsubscribe == null) {
            this._unsubscribe = []
        };
        r = new Backbone.Collection();
        this._unsubscribe.push((i = this.props.users).usersPropertyByState.apply(i, e).onValue(function(e) {
            return r.set(e, {
                merge: !0
            });
        }));
        o = new BackboneProjections.Filtered(r, {
            filter: function(e) {
                return e.id !== Flowdock.app.user.id;
            }
        });
        o.on("add remove reset", this._recap, this);
        n = new BackboneProjections.Capped(o, {
            cap: t
        });
        n.on("add remove reset", function() {
            return this.forceUpdate();
        }, this);
        return {
            filtered: o,
            capped: n
        };
    },
    _scrapCollections: function(e) {
        var t, n;
        n = e.filtered;
        t = e.capped;
        t.off(null, null, this);
        return n.off(null, null, this);
    },
    componentDidUpdate: function() {
        return this._recap();
    },
    componentWillUnmount: function() {
        var e, t, n, r;
        for (this._scrapCollections(this.state.offline), this._scrapCollections(this.state.online), 
        r = this._unsubscribe, t = 0, n = r.length; n > t; t++) {
            (e = r[t])();
        }
        return this._unsubscribe = null;
    },
    _allOnlineUsersShown: function() {
        return this.state.online.capped.length === this.state.online.filtered.length;
    },
    _users: function() {
        return l.div({
            className: "user-list-presence"
        }, l.h4({
            className: "user-list-title"
        }, "Online"), l.div({
            className: "online-user-list",
            key: "online-list"
        }, a({
            builder: function(e) {
                return function() {
                    return new Views.Shared.UserList({
                        collection: e.state.online.capped
                    });
                };
            }(this)
        })), this._allOnlineUsersShown() ? l.div(null, l.h4({
            className: "user-list-title"
        }, "Offline"), l.div({
            className: "offline-user-list",
            key: "offline-list"
        }, a({
            builder: function(e) {
                return function() {
                    return new Views.Shared.UserList({
                        collection: e.state.offline.capped
                    });
                };
            }(this)
        }))) : void 0);
    },
    _hasMore: function() {
        return this.state.online.capped.length + this.state.offline.capped.length < this.state.online.filtered.length + this.state.offline.filtered.length;
    },
    _loadMore: function() {
        if (this._hasMore()) {
            return this.setState({
                show: this.state.show + 10
            });
        }
        return;
    },
    _privacyHelp: function() {
        if (this.props.inviteOnly) {
            return "This flow is invite-only. New members have to be added manually.";
        }
        return "This flow is open for anyone in the " + this.props.organization + " organization.";
    },
    render: function() {
        return s({
            id: "user-list",
            className: "touch-scrollable",
            hasMore: this._hasMore(),
            loadMore: this._loadMore
        }, l.div(null, l.a({
            className: "close",
            onClick: this.props.onClose
        }, l.i({
            className: "fa fa-lg fa-times"
        })), l.div({
            className: "clearfix",
            id: "me"
        }, o({
            submit: this.props.saveStatus,
            status: this.props.me.status,
            flowUser: this.props.me.model,
            inTeam: this.props.me.inTeam
        })), l.div({
            className: u({
                privacy: !0,
                "invite-only": this.props.inviteOnly
            })
        }, this._privacyHelp()), l.h4({
            className: "user-list-title"
        }, "Invited"), l.div({
            className: "invited-user-list"
        }, a({
            builder: function(e) {
                return function() {
                    return new Views.Chat.Invitations({
                        collection: e.props.invitations
                    });
                };
            }(this)
        })), l.a({
            className: "primary-button",
            id: "invite-button",
            title: "Add People",
            onClick: this.props.onInvite
        }, l.i({
            className: "fa fa-fw fa-plus"
        }), "Add people"), this._users()));
    }
});
