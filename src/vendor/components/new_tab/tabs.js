var r, o, i, s, a, u, l, c;

r = require("react/addons");

s = require("classnames");

l = r.DOM;

a = l.div;

c = l.ul;

u = l.li;

i = l.a;

o = r.createClass({
    displayName: "Tabs",
    getDefaultProps: function() {
        return {
            component: "div",
            className: "tabby"
        };
    },
    getInitialState: function() {
        return {
            current: 0
        };
    },
    setActive: function(e, t) {
        return this.setState({
            current: e
        });
    },
    shouldComponentUpdate: function(e, t) {
        return this.state.current !== t.current;
    },
    componentDidUpdate: function() {
        var e;
        if (typeof (e = this.props).onTabChange == "function") {
            return e.onTabChange();
        }
        return;
    },
    render: function() {
        return r.createElement(this.props.component, this.props, this.renderMenu(), this.renderCurrentTab());
    },
    renderMenu: function() {
        return c({
            className: "tabby-menu"
        }, r.Children.map(this.props.children, function(e) {
            return function(t, n) {
                var r;
                r = s({
                    "tabby-menu-item": !0,
                    current: e.state.current === n
                });
                return u({
                    key: n,
                    className: r
                }, i({
                    className: "tabby-menu-link",
                    onClick: e.setActive.bind(e, n)
                }, t.props.name));
            };
        }(this)));
    },
    renderCurrentTab: function() {
        return a({
            className: "tabby-content"
        }, this.props.children[this.state.current]);
    }
});

module.exports = o;