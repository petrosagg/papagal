var r, o, i;

require("./boot/bugsnag");

require("./boot/csrf_protection");

require("./boot/handle_unauthorized");

require("./boot/mixpanel");

require("./boot/open_external_urls");

require("./boot/prevent_hyperlink_drop");

require("./boot/prevent_touch_page_scrolling");

require("./boot/time");

require("./boot/tipsy");

$("html").userAgentClass();

r = $.get("/rest/bootstrap", null, "json");

Flowdock.mobile = document.documentElement.clientWidth <= 767 && _.some([ "ios", "android", "iemobile" ], function(e) {
    return $("html").hasClass(e);
});

Flowdock.eventBus = _.extend({}, Backbone.Events);

o = function(e) {
    var t, n;
    t = JSON.parse(e.payload);
    n = t.flowPath;
    if (t.message != null) {
        n = n + "/messages/" + t.message
    };
    Flowdock.app.router.navigate(n, {
        trigger: true
    });
    return window.focus();
};

i = function(e) {
    var t, n;
    t = new Views.Shared.Progress({
        el: $(".loading-screen-spinner")
    });
    t.render();
    $("#loading-screen").addClass("loading-screen-active");
    t.show();
    n = function() {
        $("#loading-screen").remove();
        return t.remove();
    };
    return e(function() {
        var e;
        e = Helpers.transitionend();
        if (e) {
            return $("#loading-screen").removeClass("loading-screen-active").one(e, n);
        }
        return n();
    });
};

$(function() {
    return i(function(e) {
        return r.success(function(t) {
            var n, r;
            e();
            window.japiplexResource = t.japiplex_resource;
            Flowdock.app = new Flowdock.App({
                features: t.features,
                flows: t.flows,
                markers: t.markers,
                preferences: t.preferences,
                privates: t.privates,
                privatesEmojis: t.privates_emojis,
                tabOrder: t.tab_order,
                user: t.user
            });
            Flowdock.app.initUi();
            if ((typeof macgap != "undefined" && null !== macgap ? macgap.growl : undefined) != null) {
                window.addEventListener("macGapNotificationClick", o, false)
            };
            moment.locale(Flowdock.app.preferences.get("locale"));
            console.log("init connection");
            Flowdock.app.initConnection();
            Flowdock.app.start({
                tutorial: t.tutorial
            });
            $(window).trigger("flowdock-start");
            n = $('meta[name="android-flowdock-app"]');
            if (n.length) {
                r = new Views.Overlays.PromotionBanner({
                    content: n.attr("content")
                }), r.closedPermanently() || $("body").append(r.render().$el)
            };
            if (Flowdock.mobile) {
                return undefined;
            }
            return $("body").addClass("no-mobile");
        });
    });
});
