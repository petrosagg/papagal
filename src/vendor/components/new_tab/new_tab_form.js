var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b, y, w, k, x, C;

k = React.DOM;

m = k.div;

b = k.header;

C = k.span;

y = k.i;

f = k.a;

g = k.form;

x = k.section;

w = k.input;

v = k.h3;

d = React.createFactory(require("components/new_tab/tabs"));

p = React.createFactory(require("components/new_tab/tab"));

s = React.createFactory(require("components/infinite_list"));

o = React.createFactory(require("components/collection_listener"));

a = React.createFactory(require("components/loader"));

c = React.createFactory(require("components/new_tab/result"));

i = require("presenters/flow_tab");

h = require("presenters/user_tab");

l = React.createFactory(require("components/new_tab/new_tab_header"));

r = require("baconjs");

u = React.createClass({
    displayName: "NewTabForm",
    getInitialState: function() {
        return {
            searchValue: "",
            searchResults: []
        };
    },
    componentWillMount: function() {
        var e, t, n, o, i, s;
        $(document).on("keydown", this.onKeyDown);
        this.subscribers = [];
        this.searchInput = new r.Bus();
        o = this.searchInput.skipDuplicates().throttle(250).toProperty("");
        t = this.searchInput.map(function(e) {
            return e.length;
        }).skipDuplicates().toProperty(false);
        i = o.map(function(e) {
            return e.replace(/^@/, "");
        });
        s = this.props.users.filter(i).map(this.userTabs);
        e = this.props.flows.filter(o).map(this.flowTabs);
        n = s.combine(e, _.union).map(this.sortByScore);
        this.subscribers.push(o.onValue(function(e) {
            return function(t) {
                return e.setState({
                    searchValue: t
                });
            };
        }(this)));
        this.subscribers.push(n.filter(t).skipDuplicates(_.isEqual).debounce(1).onValue(function(e) {
            return function(t) {
                return e.setState({
                    searchResults: t
                });
            };
        }(this)));
        this.flowsLoading = this.props.flows.loading.map(function(e) {
            return function(t) {
                return t && e.props.flows.collection.models.length === 0;
            };
        }(this));
        return this.usersLoading = this.props.users.loading.map(function(e) {
            return function(t) {
                return t && e.props.users.collection.models.length === 0;
            };
        }(this));
    },
    flowTabs: function(e) {
        var t, n, r, o;
        for (o = [], t = 0, n = e.length; n > t; t++) {
            r = e[t];
            o.push({
                item: new i(r.item),
                score: r.score
            });
        }
        return o;
    },
    userTabs: function(e) {
        var t, n, r, o;
        for (o = [], t = 0, n = e.length; n > t; t++) {
            r = e[t];
            r.item.id === this.props.privates.user.id || r.item.get("disabled") || o.push({
                item: new h(r.item, this.props.privates.get(r.item.id)),
                score: r.score
            });
        }
        return o;
    },
    sortByScore: function(e) {
        return _.pluck(_.sortBy(e, "score"), "item");
    },
    sortByName: function(e) {
        return _.sortBy(e, function(e) {
            return e.name().toLowerCase();
        });
    },
    sortByActivity: function(e) {
        return _.sortBy(e, function(e) {
            return e.lastMessageAt();
        }).reverse();
    },
    componentDidMount: function() {
        return this.selectFirst();
    },
    componentDidUpdate: function() {
        return this.selectFirst();
    },
    componentWillUnmount: function() {
        var e, t, n, r;
        for ($(document).off("keydown", this.onKeyDown), this.searchInput.end(), r = this.subscribers, 
        t = 0, n = r.length; n > t; t++) {
            (e = r[t])();
        }
        return this.searchInput = undefined;
    },
    onNavigate: function() {
        return $(document).off("keydown", this.onKeyDown);
    },
    render: function() {
        return m({
            id: "new-tab"
        }, l({
            onSubmit: this.onSubmit,
            onInput: this.onInput,
            onReset: this.onReset,
            onNavigate: this.onNavigate
        }), this.state.searchValue.length ? this.renderResults() : this.renderTabs());
    },
    renderTabs: function() {
        var e;
        e = this;
        return d({
            className: "new-tab-content",
            onTabChange: this.selectFirst
        }, p({
            name: "Flows"
        }, a({
            loading: this.flowsLoading,
            onLoadFinished: this.selectFirst
        }, o({
            collection: this.props.flows.collection,
            renderContent: function(t) {
                return s({
                    key: "flows",
                    className: "new-tab-results",
                    items: e.sortByActivity(t.models.map(function(e) {
                        return new i(e);
                    })),
                    renderItem: e.renderResult,
                    renderEmpty: e.renderEmptyFlows
                });
            }
        }))), p({
            name: "Users"
        }, a({
            loading: this.usersLoading,
            onLoadFinished: this.selectFirst
        }, o({
            collection: this.props.users.collection,
            renderContent: function(t) {
                var n;
                n = e.sortByName(t.models.filter(function(t) {
                    return !t.get("disabled") && t.id !== e.props.privates.user.id;
                }).map(function(e) {
                    return new h(e);
                }));
                return s({
                    key: "users",
                    className: "new-tab-results",
                    items: n,
                    renderItem: e.renderResult,
                    renderEmpty: e.renderEmptyUsers
                });
            }
        }))));
    },
    renderResults: function() {
        return m({
            className: "new-tab-content new-tab-searching"
        }, s({
            key: "results",
            className: "new-tab-results",
            items: this.state.searchResults,
            renderItem: this.renderResult,
            renderEmpty: this.renderEmptyResults
        }));
    },
    renderResult: function(e) {
        return c({
            key: e.id(),
            model: e.model,
            onMouseEnter: this.selectItem,
            presenter: e
        });
    },
    onKeyDown: function(e) {
        if (KeyEvent.is("down")(e)) {
            this.select("nextAll");
            return e.preventDefault();
        }
        if (KeyEvent.is("up")(e)) {
            this.select("prevAll");
            return e.preventDefault();
        }
        if (KeyEvent.is("enter")(e)) {
            this.getSelected().find("a").first().click();
            return e.preventDefault();
        }
        return;
    },
    getElement: function() {
        return $(React.findDOMNode(this));
    },
    getSelected: function() {
        return $(this.getElement().find(".selected")[0]);
    },
    select: function(e) {
        var t, n, r;
        r = this.unselect();
        n = r[e](".new-tab-item").first();
        if (r.length === 0) {
            t = $(this.getElement().find(".new-tab-item")[0]);
        } else {
            if (n.length === 0) {
                t = r;
            } else {
                t = n;
            }
        }
        t.addClass("selected");
        return this.scrollTo(t);
    },
    unselect: function() {
        return this.getSelected().removeClass("selected");
    },
    selectFirst: function() {
        this.unselect();
        return this.getElement().find(".new-tab-item").first().addClass("selected");
    },
    selectItem: function(e) {
        this.unselect();
        return $(e.currentTarget).addClass("selected");
    },
    scrollTo: function(e) {
        var t, n, r, o, i, s, a;
        t = this.getElement();
        r = $(t.find(".new-tab-results")[0]);
        o = e.position().top;
        n = e.outerHeight();
        s = parseInt(r.css("padding-top"));
        a = t.innerHeight();
        i = r.scrollTop();
        if (o + 2 * n > a) {
            return r.scrollTop(o + i - a + 2 * n);
        }
        if (n > o - s) {
            return r.scrollTop(i + o - n - s);
        }
        return;
    },
    onSubmit: function(e) {
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopImmediatePropagation()
        };
        return this.getSelected().find("a").first().click();
    },
    onInput: function(e) {
        return this.searchInput.push(e.target.value);
    },
    onReset: function(e) {
        return this.setState({
            searchValue: ""
        });
    },
    renderEmptyResults: function() {
        return m({
            className: "infinite-empty"
        }, m({
            className: "infinite-empty-title"
        }, "Could not find any flows or people matching '" + this.state.searchValue + "'."), m({
            className: "infinite-empty-subtitle"
        }, "Try searching with a less specific term."));
    },
    renderEmptyFlows: function() {
        return m({
            className: "infinite-empty"
        }, y({
            className: "fa fa-list infinite-empty-icon"
        }), m({
            className: "infinite-empty-title"
        }, "You don't seem to have any accessible flows."), m({
            className: "infinite-empty-subtitle"
        }, "."), f({
            className: "primary-button",
            href: "/app/create-flow",
            onClick: this.onNavigate
        }, y({
            className: "fa fa-fw fa-plus"
        }), "Create a new flow"));
    },
    renderEmptyUsers: function() {
        return m({
            className: "infinite-empty"
        }, y({
            className: "fa fa-users infinite-empty-icon"
        }), m({
            className: "infinite-empty-title"
        }, "You're the only user in your organizations."), m({
            className: "infinite-empty-subtitle"
        }, "Invite more people to any of your flows. Open a flow and choose Add People."));
    }
});

module.exports = u;
