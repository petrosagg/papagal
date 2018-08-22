var r, o, i, s, a;

s = React.DOM;

o = s.div;

a = s.svg;

i = s.path;

r = "M36.796,13.204c3.019,3.019,4.886,7.19,4.886,11.796c0,9.214-7.469,16.684-16.682,16.684S8.318,34.214,8.318,25 c0-4.606,1.867-8.777,4.886-11.796L7.322,7.323C2.798,11.847,0,18.097,0,25c0,13.807,11.192,25,25,25c13.807,0,25-11.193,25-25 c0-6.903-2.798-13.153-7.323-17.677L36.796,13.204z";

module.exports = React.createClass({
    displayName: "Loader",
    getInitialState: function() {
        return {
            loading: !0
        };
    },
    componentDidMount: function() {
        this.subscribers = [];
        return this.subscribers.push(this.props.loading.onValue(function(e) {
            return function(t) {
                return e.setState({
                    loading: t
                });
            };
        }(this)));
    },
    componentDidUpdate: function() {
        var e;
        if (this.state.loading) {
            return void 0;
        }
        if (typeof (e = this.props).onLoadFinished == "function") {
            return e.onLoadFinished();
        }
        return;
    },
    componentWillUnmount: function() {
        var e, t, n, r, o;
        for (r = this.subscribers, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(e());
        }
        return o;
    },
    render: function() {
        if (this.state.loading) {
            return o({
                className: "progress spinner green new-tab-spinner"
            }, a({
                "enable-background": "new 0 0 50 50",
                id: "Layer_1",
                version: "1.1",
                viewBox: "0 0 50 50",
                "xml:space": "preserve",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                xmlns: "http://www.w3.org/2000/svg"
            }, i({
                d: r
            })));
        }
        return this.props.children;
    },
    setDone: function() {
        return this.setState({
            loading: !1
        });
    }
});