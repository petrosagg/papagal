var r, o, i, s;

i = React.DOM;

s = i.ul;

o = i.li;

r = React.createFactory(require("./avatar"));

module.exports = React.createClass({
    displayName: "AvatarList",
    propTypes: {
        size: React.PropTypes.number
    },
    getInitialState: function() {
        return {
            users: []
        };
    },
    getDefaultProps: function() {
        return {
            size: 72
        };
    },
    _endUpdateRequests: function() {
        var e;
        if ((e = this._end) != null) {
            return e.end();
        }
        return;
    },
    _updateRequestsFrom: function(e) {
        this._endUpdateRequests();
        this._end = new Bacon.Bus();
        if (e != null) {
            return e.takeUntil(this._end.mapEnd(!0)).debounce(300).throttle(1e3).onValue(function(e) {
                return function(t) {
                    return e.setState({
                        users: t
                    });
                };
            }(this));
        }
        return;
    },
    componentWillReceiveProps: function(e) {
        return this._updateRequestsFrom(e.onlineUsers);
    },
    componentDidMount: function() {
        return this._updateRequestsFrom(this.props.onlineUsers);
    },
    componentWillUnmount: function() {
        return this._endUpdateRequests();
    },
    render: function() {
        var e;
        e = this.props.size;
        return s({
            className: "user-avatar-list"
        }, this.state.users.map(function(t) {
            return o({
                key: "avatar-user-list-" + t.id
            }, r({
                key: "avatar-user-" + t.id,
                model: t,
                size: e
            }));
        }));
    }
});