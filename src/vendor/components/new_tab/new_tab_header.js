var r, o, i, s, a, u, l, c, p, d;

p = React.DOM;

u = p.header;

a = p.h3;

o = p.a;

l = p.i;

d = p.span;

c = p.input;

s = p.form;

i = require("classnames");

r = React.createClass({
    displayName: "NewTabHeader",
    getInitialState: function() {
        return {
            empty: !0
        };
    },
    shouldComponentUpdate: function(e, t) {
        return this.state.empty !== t.empty;
    },
    render: function() {
        var e;
        e = i({
            "new-tab-search-reset": !0,
            "dark-link": !0,
            hidden: this.state.empty
        });
        return u({
            className: "new-tab-header"
        }, o({
            className: "primary-button right",
            href: "/app/create-flow",
            onClick: this.props.onNavigate
        }, l({
            className: "fa fa-fw fa-plus"
        }), d({
            className: "show-for-large-up"
        }, "Create a new flow")), o({
            className: "button mobile-only left",
            href: "/app"
        }, l({
            className: "fa fa-arrow-left"
        })), a({
            className: "new-tab-title"
        }, "Open a flow or 1-to-1 chat"), s({
            className: "new-tab-search",
            onSubmit: this.props.onSubmit
        }, c({
            ref: "input",
            className: "new-tab-search-input",
            type: "text",
            placeholder: "Search for flows and users",
            autoFocus: !0,
            onInput: this.onInput
        }), o({
            title: "Clear search",
            className: e,
            onClick: this.onReset
        }, l({
            className: "fa fa-times-circle"
        }))));
    },
    onInput: function(e) {
        this.setState({
            empty: !e.target.value.length
        });
        return this.props.onInput(e);
    },
    onReset: function(e) {
        React.findDOMNode(this.refs.input).value = "";
        this.setState({
            empty: !0
        });
        return this.props.onReset(e);
    }
});

module.exports = r;