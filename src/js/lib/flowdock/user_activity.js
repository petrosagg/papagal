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

r.visibility = (i = Modernizr.prefixed("hidden", document, !1)) ? (o = i.replace(/[Hh]idden/, ""), 
$(document).asEventStream(o + "visibilitychange").map(function() {
    return !document[i];
})) : Bacon.never();

Flowdock.userActivity = Bacon.mergeAll([ r.mousemoves, r.focuses, r.keydowns ]);

Flowdock.windowFocus = Bacon.mergeAll([ r.blurs.map(function() {
    return !1;
}), r.focuses.map(function() {
    return !0;
}) ]).toProperty(!0).skipDuplicates();

Flowdock.appFocus = Flowdock.windowFocus.flatMapLatest(function(e) {
    if (e) {
        return Bacon.once(!0).merge(Flowdock.userActivity).flatMapLatest(function() {
            return Bacon.once(!0).merge(Bacon.later(r.IDLE_THRESHOLD, !1));
        });
    }
    return Bacon.once(!1).merge(r.mousemoves.flatMapLatest(function() {
        return Bacon.once(!0).merge(Bacon.later(r.MOUSE_IDLE_THRESHOLD, !1));
    }));
}).toProperty(!0).and(r.visibility.toProperty(!0)).skipDuplicates();
