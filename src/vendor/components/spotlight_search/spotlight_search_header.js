var r, o, i, s, a, u, l, c, p, d, h;

d = React.DOM;

l = d.header;

u = d.h3;

o = d.a;

c = d.i;

h = d.span;

p = d.input;

a = d.form;

s = d.div;

i = require("classnames");

r = React.createClass({
    displayName: "SpotlightSearchHeader",
    getInitialState: function() {
        return {
            empty: true
        };
    },
    shouldComponentUpdate: function(e, t) {
        return this.state.empty !== t.empty;
    },
    render: function() {
        var e;
        e = i({
            "new-tab-search-reset": true,
            "dark-link": true,
            hidden: this.state.empty
        });
        return s({
            id: "spotlight-header"
        }, this.props.isShortKeyUsed ? undefined : s({
            className: "spotlight-search-header-text"
        }, '"Ctrl + G" launches this faster ...'), l({
            className: "spotlight-search-header"
        }, a({
            className: "spotlight-search-search",
            onSubmit: this.props.onSubmit
        }, p({
            ref: "input",
            className: "spotlight-search-input",
            type: "text",
            placeholder: "Go to flows and @users of your choice ...",
            autoFocus: true,
            onInput: this.onInput
        }), o({
            title: "Clear search",
            className: e,
            onClick: this.onReset
        }, c({
            className: "fa fa-times-circle"
        })))));
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
            empty: true
        });
        return this.props.onReset(e);
    }
});

module.exports = r;
