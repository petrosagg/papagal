var r, o, i, s, a, u, l, c;

u = require("mixpanel-browser");

r = require("../helpers/analytics_helper");

o = require("../helpers/cookie_helper");

a = function() {
    return Flowdock.app.getOrganizations(i);
};

i = function() {
    var e, t, n, i, s, a, c, p;
    p = Flowdock.app.user;
    e = Flowdock.app.getOrganizations().active();
    t = [];
    a = [];
    i = [];
    n = [];
    c = [];
    e.forEach(function(e) {
        t.push(e.id);
        a.push(e.get("name"));
        if (e.get("subscription").trial) {
            i.push(e.id);
        } else {
            n.push(e.id);
        }
        return c.push(e.get("subscription").trial_ends);
    });
    s = {
        id: p.id,
        email: p.get("email"),
        nick: p.get("nick"),
        name: p.get("name"),
        organizationIds: t,
        organizationNames: a,
        organizationIdsTrial: i,
        organizationIdsNotTrial: n,
        trial_ends: c
    };
    if (o.getCookie("isNewUser")) {
        s.created_date = new Date().toISOString();
        u.alias(p.id);
        u.track(r.EVENT_TYPES.user_sign_up);
        o.setCookie("isNewUser", "", -1);
    };
    u.identify(p.id);
    u.people.set(s);
    u.register({
        Platform: "Web"
    });
    return l();
};

l = function() {
    u.track(r.EVENT_TYPES.user_activity);
    return setInterval(function() {
        return u.track(r.EVENT_TYPES.user_activity);
    }, 432e5);
};

c = function(e) {
    var t, n;
    n = true;
    if (Flowdock.analytics.highVolumeEvents.hasOwnProperty(e)) {
        t = new Date().getTime() - Flowdock.analytics.highVolumeEvents[e];
        n = t / 36e5 >= 24;
    };
    if (n) {
        Flowdock.analytics.highVolumeEvents[e] = new Date().getTime();
        return u.track(e);
    }
    return;
};

s = function() {
    u.init(Flowdock.mixpanel.key, {
        api_host: "https://api.mixpanel.com"
    });
    Flowdock.analytics = u;
    Flowdock.analytics.highVolumeEvents = {};
    return Flowdock.analytics.trackHighVolume = c;
};

$(window).one("flowdock-start", function() {
    Flowdock.ANALYTICS_EVENT_TYPES = r.EVENT_TYPES;
    if (Flowdock.mixpanel.key) {
        s();
        return a();
    }
    console.log("Missing mixpanel key, skipping initialization of user metrics");
    return Flowdock.analytics = {
        identify: function() {},
        people: {
            set: function() {}
        },
        track: function() {},
        trackHighVolume: function() {}
    };
});
