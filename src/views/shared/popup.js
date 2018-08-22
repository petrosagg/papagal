Views.Shared.Popup = function() {
    function Popup(e, t, n) {
        this.url = e;
        if (n == null) {
            n = {}
        };
        this.properties = _.defaults(n, this.defaultProperties);
        this.subscribers = [];
        this.resultStream = Flowdock.app.postMessages.filter(function(e) {
            return e.type === t;
        });
    }
    Popup.prototype.defaultProperties = {
        scrollbars: "yes",
        menubar: "no",
        height: "670",
        width: "1000",
        top: "50",
        left: "100",
        resizable: "yes",
        toolbar: "no",
        status: "no"
    };
    Popup.prototype.open = function() {
        var e;
        e = window.open(this.url, this.properties.name, this._formattedProperties());
        e.focus();
        return this.subscribers.push(this.resultStream.onValue(function() {
            return e.close();
        }));
    };
    Popup.prototype._formattedProperties = function() {
        var e, t;
        return function() {
            var n, r;
            n = this.properties;
            r = [];
            for (e in n) {
                t = n[e];
                r.push(e + "=" + t);
            }
            return r;
        }.call(this).join(",");
    };
    Popup.prototype.destructor = function() {
        var e, t, n, r, o;
        for (n = this.subscribers, r = [], e = 0, t = n.length; t > e; e++) {
            o = n[e];
            r.push(o());
        }
        return r;
    };
    return Popup;
}();