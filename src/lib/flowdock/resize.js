var r, o;

o = $(window).asEventStream("resize");

Flowdock.resize = r = {
    window: {
        move: o,
        end: o.debounce(500)
    }
};

_.extend(Flowdock.resize, {
    moves: r.window.move,
    ends: r.window.end
});