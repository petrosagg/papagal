Flowdock.KeyboardEvents = {
    bindKeyboardEvents: function() {
        if (this.keyboardEvents != null) {
            return this.listenTo(this, "view:attach:before", function() {
                var e;
                e = this.keyboardEventFilter != null ? Flowdock.app.shortcutStream.filter(this.keyboardEventFilter) : Flowdock.app.shortcutStream;
                if (e != null) {
                    return e.takeUntil(this.asEventStream("view:detach:before destructor")).filter(function(e) {
                        return function(t) {
                            return e.keyboardEvents[t.action] != null;
                        };
                    }(this)).onValue(function(e) {
                        return function(t) {
                            var n;
                            n = e.keyboardEvents[t.action];
                            _.isFunction(n) || (n = e[e.keyboardEvents[t.action]]);
                            if (n != null) {
                                return n.call(e, t);
                            }
                            return;
                        };
                    }(this));
                }
                return;
            });
        }
        return;
    }
};