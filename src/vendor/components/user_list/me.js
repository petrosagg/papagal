var r, o, i;

o = require("react");

i = o.DOM;

r = o.createFactory(require("components/users/avatar"));

module.exports = o.createClass({
    onStatusInput: function(e) {
        return this.setState({
            input: e.target.value
        });
    },
    hasFocus: function() {
        return this._hasFocus = !0;
    },
    maybeSubmit: function(e) {
        this._isBlurring = !1;
        if (this._hasFocus) {
            this.state.input != null && this.state.input !== this.props.status ? this.props.submit(this.state.input) : this.setState({
                input: this.props.status
            }), this._hasFocus = !1, $(e.target).blur()
        };
        return null;
    },
    _status: function() {
        if (this._hasFocus) {
            return this.state.input;
        }
        return this.props.status;
    },
    getInitialState: function() {
        this._hasFocus = !1;
        return {
            input: this.props.status
        };
    },
    render: function() {
        var e, t;
        if ((e = this.props.flowUser) == null) {
            return i.div({});
        }
        t = this.props.inTeam ? i.span({
            className: "user-in-team thread-status thread-status-small green",
            title: "You will be notified of @team mentions"
        }, "team") : void 0;
        return i.div({}, r({
            className: "user-avatar",
            size: 120,
            model: e,
            userCard: !1,
            useCSS: !0
        }), i.div({
            className: "user-name"
        }, e.get("nick") + " (" + e.get("name") + ")"), i.div({
            className: "user-status"
        }, i.input({
            onFocus: this.hasFocus,
            onKeyDown: function(e) {
                return function(t) {
                    e._isBlurring = !1;
                    return null;
                };
            }(this),
            onKeyUp: function(e) {
                return function(t) {
                    if (t.keyCode === 13) {
                        return e.maybeSubmit(t);
                    }
                    return;
                };
            }(this),
            onChange: this.onStatusInput,
            onBlur: function(e) {
                return function(t) {
                    e._isBlurring = !0;
                    return setTimeout(function() {
                        if (e._isBlurring) {
                            return e.maybeSubmit(t);
                        }
                        return e.setState({
                            input: e.props.status
                        });
                    }, 0);
                };
            }(this),
            value: this._status(null),
            id: "status-input",
            placeholder: "Edit status message ...",
            title: "Click to edit your status message"
        })), t);
    }
});
