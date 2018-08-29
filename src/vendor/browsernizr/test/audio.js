var r = require("./../lib/Modernizr"), o = require("./../lib/createElement");

r.addTest("audio", function() {
    var e = o("audio"), t = false;
    try {
        t = !!e.canPlayType;
        if (t) {
            t = new Boolean(t), t.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), 
            t.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), t.opus = e.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), 
            t.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), t.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "")
        }
    } catch (n) {}
    return t;
});
