require("bugsnag-js");

Bugsnag.apiKey = "62f0e59cb3ea92da1c444c55f8dc29b8";

Bugsnag.releaseStage = Flowdock.environment;

Bugsnag.appVersion = Flowdock.commit;

$(window).one("flowdock-start", function() {
    var e;
    e = Flowdock.app.user;
    return Bugsnag.user = {
        id: e.id,
        email: e.get("email"),
        name: e.get("name")
    };
});
