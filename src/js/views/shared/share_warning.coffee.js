var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("./coach_tooltip");

o = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    i(n, t);
    n.prototype.template = require("../../templates/shared/share_warning.mustache");
    n.prototype.id = "share-tip";
    n.prototype.events = function() {
        return {
            "click .coach-tooltip-next": this.sendToRally,
            "click .coach-tooltip-stop": this.close
        };
    };
    n.prototype.initialize = function(e) {
        var t, n;
        t = e.msg;
        n = e.text;
        this.msg = t;
        this.text = n;
        return _.defer(function(e) {
            return function() {
                return e.untilEnd($(window).asEventStream("blur click keyup")).filter(function(e) {
                    return e.type === "click" && !$(e.target).closest("#share-tip").length && !$(e.target).closest(".share-with-rally").length || KeyEvent.isKey("esc")(e);
                }).onValue(function() {
                    return e.close();
                });
            };
        }(this));
    };
    n.prototype.serializeData = function() {
        return {
            text: this.text
        };
    };
    n.prototype.sendToRally = function() {
        var e, t, n;
        this.remove();
        t = this.msg.model;
        e = t.flow();
        n = t.get("thread");
        return $.ajax({
            url: Helpers.apiUrl("/actions/" + n.source.id + "/discussion_message"),
            type: "post",
            data: {
                flow_name: e.get("name"),
                flow_url: t.flowUrl(),
                organization_name: e.get("organization").name,
                caac_url: n.external_url,
                message: t.getContent(),
                thread_id: n.id
            },
            error: function(e) {
                var t;
                t = JSON.parse(e.responseText);
                if ((t != null ? t.message : undefined) === "Authentication required" && t.url != null) {
                    return Flowdock.app.manager.toastError("external-authentication-required", {
                        url: t.url,
                        application: "Rally"
                    });
                }
                return Flowdock.app.manager.toastError("external-action-failed", {
                    title: "Sharing with CA Agile Central failed!",
                    description: (t != null ? t.message : undefined) || "status " + e.status
                });
            }
        });
    };
    n.prototype.close = function(e) {
        var t;
        t = function(t) {
            return function() {
                var n;
                if ((n = t.tether) != null) {
                    n.destroy()
                };
                t.destructor();
                if (typeof e == "function") {
                    return e();
                }
                return;
            };
        }(this);
        if (e) {
            return t();
        }
        return this.fadeOut(t);
    };
    return n;
}(r);

module.exports = o;
