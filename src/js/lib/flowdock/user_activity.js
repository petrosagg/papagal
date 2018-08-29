var r, o, i;

Flowdock.UserActivity = r = {
    IDLE_THRESHOLD: 12e4,
    MOUSE_IDLE_THRESHOLD: 1e4,
    MOUSEMOVE_INTERVAL: 5e3,
    KEYDOWN_INTERVAL: 3e3
};

_.extend(r, {
    mousemoves: Bacon.throttledStream(document, "mousemove", r.MOUSEMOVE_INTERVAL),
    focuses: $(window).asEventStream("focus"),
    blurs: $(window).asEventStream("blur"),
    keydowns: Bacon.throttledStream(document, "keydown", r.KEYDOWN_INTERVAL)
});

i = Modernizr.prefixed("hidden", document, false);

if (i) {
    r.visibility = (o = i.replace(/[Hh]idden/, ""), $(document).asEventStream(o + "visibilitychange").map(function() {
        return !document[i];
    }));
} else {
    r.visibility = Bacon.never();
}

Flowdock.userActivity = Bacon.mergeAll([ r.mousemoves, r.focuses, r.keydowns ]);

Flowdock.windowFocus = Bacon.mergeAll([ r.blurs.map(function() {
    return false;
}), r.focuses.map(function() {
    return true;
}) ]).toProperty(true).skipDuplicates();

Flowdock.appFocus = Flowdock.windowFocus.flatMapLatest(function(e) {
    if (e) {
        return Bacon.once(true).merge(Flowdock.userActivity).flatMapLatest(function() {
            return Bacon.once(true).merge(Bacon.later(r.IDLE_THRESHOLD, false));
        });
    }
    return Bacon.once(false).merge(r.mousemoves.flatMapLatest(function() {
        return Bacon.once(true).merge(Bacon.later(r.MOUSE_IDLE_THRESHOLD, false));
    }));
}).toProperty(true).and(r.visibility.toProperty(true)).skipDuplicates();
