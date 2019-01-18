var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b, y, w, k, x, C, E;

x = React.DOM;

g = x.div;

y = x.header;

E = x.span;

w = x.i;

m = x.a;

v = x.form;

C = x.section;

k = x.input;

b = x.h3;

h = React.createFactory(require("components/new_tab/tabs"));

d = React.createFactory(require("components/new_tab/tab"));

s = React.createFactory(require("components/infinite_list"));

o = React.createFactory(require("components/collection_listener"));

a = React.createFactory(require("components/loader"));

c = React.createFactory(require("components/new_tab/result"));

i = require("presenters/flow_tab");

f = require("presenters/user_tab");

l = React.createFactory(require("components/new_tab/new_tab_header"));

p = React.createFactory(require("components/spotlight_search/spotlight_search_header"));

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
        o = this.searchInput.skipDuplicates().toProperty("");
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
            if (!(r.item.id === this.props.privates.user.id || r.item.get("disabled"))) {
                o.push({
                    item: new f(r.item, this.props.privates.get(r.item.id)),
                    score: r.score
                })
            };
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
        return g({
            id: "new-tab"
        }, this.props.shouldShowTabs ? l({
            onSubmit: this.onSubmit,
            onInput: this.onInput,
            onReset: this.onReset,
            onNavigate: this.onNavigate,
            onInputBlur: this.props.onInputBlur
        }) : p({
            onSubmit: this.onSubmit,
            onInput: this.onInput,
            onReset: this.onReset,
            onNavigate: this.onNavigate,
            onInputBlur: this.props.onInputBlur,
            isShortKeyUsed: this.props.isShortcutKeyUsed
        }), this.state.searchValue.length ? this.renderResults() : this.props.shouldShowTabs ? this.renderTabs() : undefined);
    },
    renderTabs: function() {
        var e;
        e = this;
        return h({
            className: "new-tab-content",
            onTabChange: this.selectFirst
        }, d({
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
        }))), d({
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
                    return new f(e);
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
        return g({
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
            className: "new-tab-item",
            key: e.id(),
            model: e.model,
            onClick: this.props.onResultClick,
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
            this.onSubmit(e);
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
            if (n.length === 0 && e === "nextAll") {
                t = this.getElement().find(".new-tab-item").first();
            } else {
                if (n.length === 0 && e === "prevAll") {
                    t = this.getElement().find(".new-tab-item").last();
                } else {
                    t = n;
                }
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
        o = $(t.find(".new-tab-results")[0]);
        a = parseInt(o.css("padding-top"));
        r = e.position().top - a;
        n = e.outerHeight();
        i = o.height();
        s = o.scrollTop();
        if (r + n > i) {
            return o.scrollTop(r + s - i + n);
        }
        if (r < 0) {
            return o.scrollTop(s + r);
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
        this.getSelected().find("a").first().click();
        return this.props.onResultClick && this.props.onResultClick();
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
        return g({
            className: "infinite-empty"
        }, g({
            className: "infinite-empty-title"
        }, "Could not find any flows or people matching '" + this.state.searchValue + "'."), g({
            className: "infinite-empty-subtitle"
        }, "Try searching with a less specific term."));
    },
    renderEmptyFlows: function() {
        return g({
            className: "infinite-empty"
        }, w({
            className: "fa fa-list infinite-empty-icon"
        }), g({
            className: "infinite-empty-title"
        }, "You don't seem to have any accessible flows."), g({
            className: "infinite-empty-subtitle"
        }, "."), m({
            className: "primary-button",
            href: "/app/create-flow",
            onClick: this.onNavigate
        }, w({
            className: "fa fa-fw fa-plus"
        }), "Create a new flow"));
    },
    renderEmptyUsers: function() {
        return g({
            className: "infinite-empty"
        }, w({
            className: "fa fa-users infinite-empty-icon"
        }), g({
            className: "infinite-empty-title"
        }, "You're the only user in your organizations."), g({
            className: "infinite-empty-subtitle"
        }, "Invite more people to any of your flows. Open a flow and choose Add People."));
    }
});

module.exports = u;
