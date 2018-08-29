(function(e) {
    !function() {
        "use strict";
        var t = function() {
            this.init();
        };
        t.prototype = {
            init: function() {
                var e = this || r;
                e._counter = 1e3;
                e._codecs = {};
                e._howls = [];
                e._muted = false;
                e._volume = 1;
                e._canPlayEvent = "canplaythrough";
                e._navigator = typeof window != "undefined" && window.navigator ? window.navigator : null;
                e.masterGain = null;
                e.noAudio = false;
                e.usingWebAudio = true;
                e.autoSuspend = true;
                e.ctx = null;
                e.mobileAutoEnable = true;
                e._setup();
                return e;
            },
            volume: function(e) {
                var t = this || r;
                e = parseFloat(e);
                t.ctx || p();
                if (typeof e != "undefined" && e >= 0 && e <= 1) {
                    t._volume = e;
                    if (t._muted) {
                        return t;
                    }
                    if (t.usingWebAudio) {
                        t.masterGain.gain.setValueAtTime(e, r.ctx.currentTime)
                    };
                    for (var n = 0; n < t._howls.length; n++) {
                        if (!t._howls[n]._webAudio) {
                            for (var o = t._howls[n]._getSoundIds(), i = 0; i < o.length; i++) {
                                var s = t._howls[n]._soundById(o[i]);
                                if (s && s._node) {
                                    s._node.volume = s._volume * e
                                };
                            }
                        }
                    }
                    return t;
                }
                return t._volume;
            },
            mute: function(e) {
                var t = this || r;
                t.ctx || p();
                t._muted = e;
                if (t.usingWebAudio) {
                    t.masterGain.gain.setValueAtTime(e ? 0 : t._volume, r.ctx.currentTime)
                };
                for (var n = 0; n < t._howls.length; n++) {
                    if (!t._howls[n]._webAudio) {
                        for (var o = t._howls[n]._getSoundIds(), i = 0; i < o.length; i++) {
                            var s = t._howls[n]._soundById(o[i]);
                            if (s && s._node) {
                                s._node.muted = e ? true : s._muted
                            };
                        }
                    }
                }
                return t;
            },
            unload: function() {
                for (var e = this || r, t = e._howls.length - 1; t >= 0; t--) {
                    e._howls[t].unload();
                }
                if (e.usingWebAudio && e.ctx && typeof e.ctx.close != "undefined") {
                    e.ctx.close(), e.ctx = null, p()
                };
                return e;
            },
            codecs: function(e) {
                return (this || r)._codecs[e.replace(/^x-/, "")];
            },
            _setup: function() {
                var e = this || r;
                e.state = e.ctx ? e.ctx.state || "running" : "running";
                e._autoSuspend();
                if (!e.usingWebAudio) {
                    if (typeof Audio != "undefined") {
                        try {
                            var t = new Audio();
                            if (typeof t.oncanplaythrough == "undefined") {
                                e._canPlayEvent = "canplay"
                            };
                        } catch (n) {
                            e.noAudio = !0;
                        }
                    } else {
                        e.noAudio = true;
                    }
                }
                try {
                    var t = new Audio();
                    if (t.muted) {
                        e.noAudio = true
                    };
                } catch (n) {}
                e.noAudio || e._setupCodecs();
                return e;
            },
            _setupCodecs: function() {
                var e = this || r, t = null;
                try {
                    t = typeof Audio != "undefined" ? new Audio() : null;
                } catch (n) {
                    return e;
                }
                if (!t || typeof t.canPlayType != "function") {
                    return e;
                }
                var o = t.canPlayType("audio/mpeg;").replace(/^no$/, ""), i = e._navigator && e._navigator.userAgent.match(/OPR\/([0-6].)/g), s = i && parseInt(i[0].split("/")[1], 10) < 33;
                e._codecs = {
                    mp3: !(s || !o && !t.canPlayType("audio/mp3;").replace(/^no$/, "")),
                    mpeg: !!o,
                    opus: !!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    oga: !!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!t.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                    aac: !!t.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!t.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(t.canPlayType("audio/x-m4a;") || t.canPlayType("audio/m4a;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(t.canPlayType("audio/x-mp4;") || t.canPlayType("audio/mp4;") || t.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                    webm: !!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                    dolby: !!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(t.canPlayType("audio/x-flac;") || t.canPlayType("audio/flac;")).replace(/^no$/, "")
                };
                return e;
            },
            _enableMobileAudio: function() {
                var e = this || r, t = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(e._navigator && e._navigator.userAgent), n = !!("ontouchend" in window || e._navigator && e._navigator.maxTouchPoints > 0 || e._navigator && e._navigator.msMaxTouchPoints > 0);
                if (!e._mobileEnabled && e.ctx && (t || n)) {
                    e._mobileEnabled = false;
                    e._mobileUnloaded || e.ctx.sampleRate === 44100 || (e._mobileUnloaded = true, e.unload());
                    e._scratchBuffer = e.ctx.createBuffer(1, 1, 22050);
                    var o = function() {
                        r._autoResume();
                        var t = e.ctx.createBufferSource();
                        t.buffer = e._scratchBuffer;
                        t.connect(e.ctx.destination);
                        if (typeof t.start == "undefined") {
                            t.noteOn(0);
                        } else {
                            t.start(0);
                        }
                        if (typeof e.ctx.resume == "function") {
                            e.ctx.resume()
                        };
                        t.onended = function() {
                            t.disconnect(0);
                            e._mobileEnabled = true;
                            e.mobileAutoEnable = false;
                            document.removeEventListener("touchstart", o, true);
                            document.removeEventListener("touchend", o, true);
                        };
                    };
                    document.addEventListener("touchstart", o, true);
                    document.addEventListener("touchend", o, true);
                    return e;
                }
            },
            _autoSuspend: function() {
                var e = this;
                if (e.autoSuspend && e.ctx && typeof e.ctx.suspend != "undefined" && r.usingWebAudio) {
                    for (var t = 0; t < e._howls.length; t++) {
                        if (e._howls[t]._webAudio) {
                            for (var n = 0; n < e._howls[t]._sounds.length; n++) {
                                if (!e._howls[t]._sounds[n]._paused) {
                                    return e;
                                }
                            }
                        }
                    }
                    if (e._suspendTimer) {
                        clearTimeout(e._suspendTimer)
                    };
                    e._suspendTimer = setTimeout(function() {
                        if (e.autoSuspend) {
                            e._suspendTimer = null, e.state = "suspending", e.ctx.suspend().then(function() {
                                e.state = "suspended";
                                if (e._resumeAfterSuspend) {
                                    delete e._resumeAfterSuspend, e._autoResume()
                                };
                            })
                        };
                    }, 3e4);
                    return e;
                }
            },
            _autoResume: function() {
                var e = this;
                if (e.ctx && typeof e.ctx.resume != "undefined" && r.usingWebAudio) {
                    if (e.state === "running" && e._suspendTimer) {
                        clearTimeout(e._suspendTimer);
                        e._suspendTimer = null;
                    } else {
                        if (e.state === "suspended") {
                            e.ctx.resume().then(function() {
                                e.state = "running";
                                for (var t = 0; t < e._howls.length; t++) {
                                    e._howls[t]._emit("resume");
                                }
                            });
                            if (e._suspendTimer) {
                                clearTimeout(e._suspendTimer), e._suspendTimer = null
                            };
                        } else {
                            if (e.state === "suspending") {
                                e._resumeAfterSuspend = true
                            };
                        }
                    }
                    return e;
                }
            }
        };
        var r = new t(), o = function(e) {
            var t = this;
            if (e.src && 0 !== e.src.length) {
                return void t.init(e);
            }
            return void console.error("An array of source files must be passed with any new Howl.");
        };
        o.prototype = {
            init: function(e) {
                var t = this;
                r.ctx || p();
                t._autoplay = e.autoplay || false;
                t._format = typeof e.format != "string" ? e.format : [ e.format ];
                t._html5 = e.html5 || false;
                t._muted = e.mute || false;
                t._loop = e.loop || false;
                t._pool = e.pool || 5;
                t._preload = typeof e.preload == "boolean" ? e.preload : true;
                t._rate = e.rate || 1;
                t._sprite = e.sprite || {};
                t._src = typeof e.src != "string" ? e.src : [ e.src ];
                t._volume = undefined !== e.volume ? e.volume : 1;
                t._xhrWithCredentials = e.xhrWithCredentials || false;
                t._duration = 0;
                t._state = "unloaded";
                t._sounds = [];
                t._endTimers = {};
                t._queue = [];
                t._playLock = false;
                t._onend = e.onend ? [ {
                    fn: e.onend
                } ] : [];
                t._onfade = e.onfade ? [ {
                    fn: e.onfade
                } ] : [];
                t._onload = e.onload ? [ {
                    fn: e.onload
                } ] : [];
                t._onloaderror = e.onloaderror ? [ {
                    fn: e.onloaderror
                } ] : [];
                t._onplayerror = e.onplayerror ? [ {
                    fn: e.onplayerror
                } ] : [];
                t._onpause = e.onpause ? [ {
                    fn: e.onpause
                } ] : [];
                t._onplay = e.onplay ? [ {
                    fn: e.onplay
                } ] : [];
                t._onstop = e.onstop ? [ {
                    fn: e.onstop
                } ] : [];
                t._onmute = e.onmute ? [ {
                    fn: e.onmute
                } ] : [];
                t._onvolume = e.onvolume ? [ {
                    fn: e.onvolume
                } ] : [];
                t._onrate = e.onrate ? [ {
                    fn: e.onrate
                } ] : [];
                t._onseek = e.onseek ? [ {
                    fn: e.onseek
                } ] : [];
                t._onresume = [];
                t._webAudio = r.usingWebAudio && !t._html5;
                if (typeof r.ctx != "undefined" && r.ctx && r.mobileAutoEnable) {
                    r._enableMobileAudio()
                };
                r._howls.push(t);
                if (t._autoplay) {
                    t._queue.push({
                        event: "play",
                        action: function() {
                            t.play();
                        }
                    })
                };
                if (t._preload) {
                    t.load()
                };
                return t;
            },
            load: function() {
                var e = this, t = null;
                if (r.noAudio) {
                    return void e._emit("loaderror", null, "No audio support.");
                }
                if (typeof e._src == "string") {
                    e._src = [ e._src ]
                };
                for (var n = 0; n < e._src.length; n++) {
                    var o, s;
                    if (e._format && e._format[n]) {
                        o = e._format[n];
                    } else {
                        s = e._src[n];
                        if (typeof s != "string") {
                            e._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue;
                        }
                        o = /^data:audio\/([^;,]+);/i.exec(s);
                        o || (o = /\.([^.]+)$/.exec(s.split("?", 1)[0]));
                        if (o) {
                            o = o[1].toLowerCase()
                        };
                    }
                    o || console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
                    if (o && r.codecs(o)) {
                        t = e._src[n];
                        break;
                    }
                }
                if (t) {
                    e._src = t;
                    e._state = "loading";
                    if (window.location.protocol === "https:" && t.slice(0, 5) === "http:") {
                        e._html5 = true, e._webAudio = false
                    };
                    new i(e);
                    if (e._webAudio) {
                        a(e)
                    };
                    return e;
                }
                return void e._emit("loaderror", null, "No codec support for selected audio sources.");
            },
            play: function(e, t) {
                var n = this, o = null;
                if (typeof e == "number") {
                    o = e;
                    e = null;
                } else {
                    if (typeof e == "string" && n._state === "loaded" && !n._sprite[e]) {
                        return null;
                    }
                    if (typeof e == "undefined") {
                        e = "__default";
                        for (var i = 0, s = 0; s < n._sounds.length; s++) {
                            if (n._sounds[s]._paused && !n._sounds[s]._ended) {
                                i++, o = n._sounds[s]._id
                            };
                        }
                        if (i === 1) {
                            e = null;
                        } else {
                            o = null;
                        }
                    }
                }
                var a = o ? n._soundById(o) : n._inactiveSound();
                if (!a) {
                    return null;
                }
                if (o && !e) {
                    e = a._sprite || "__default"
                };
                if ("loaded" !== n._state) {
                    a._sprite = e;
                    a._ended = false;
                    var u = a._id;
                    n._queue.push({
                        event: "play",
                        action: function() {
                            n.play(u);
                        }
                    });
                    return u;
                }
                if (o && !a._paused) {
                    t || n._loadQueue("play");
                    return a._id;
                }
                if (n._webAudio) {
                    r._autoResume()
                };
                var l = Math.max(0, a._seek > 0 ? a._seek : n._sprite[e][0] / 1e3), c = Math.max(0, (n._sprite[e][0] + n._sprite[e][1]) / 1e3 - l), p = 1e3 * c / Math.abs(a._rate);
                a._paused = false;
                a._ended = false;
                a._sprite = e;
                a._seek = l;
                a._start = n._sprite[e][0] / 1e3;
                a._stop = (n._sprite[e][0] + n._sprite[e][1]) / 1e3;
                a._loop = !(!a._loop && !n._sprite[e][2]);
                var d = a._node;
                if (n._webAudio) {
                    var h = function() {
                        n._refreshBuffer(a);
                        var e = a._muted || n._muted ? 0 : a._volume;
                        d.gain.setValueAtTime(e, r.ctx.currentTime);
                        a._playStart = r.ctx.currentTime;
                        if (typeof d.bufferSource.start == "undefined") {
                            if (a._loop) {
                                d.bufferSource.noteGrainOn(0, l, 86400);
                            } else {
                                d.bufferSource.noteGrainOn(0, l, c);
                            }
                        } else {
                            if (a._loop) {
                                d.bufferSource.start(0, l, 86400);
                            } else {
                                d.bufferSource.start(0, l, c);
                            }
                        }
                        if (p !== 1 / 0) {
                            n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), p)
                        };
                        t || setTimeout(function() {
                            n._emit("play", a._id);
                        }, 0);
                    };
                    if (r.state === "running") {
                        h();
                    } else {
                        n.once("resume", h);
                        n._clearTimer(a._id);
                    }
                } else {
                    var f = function() {
                        d.currentTime = l;
                        d.muted = a._muted || n._muted || r._muted || d.muted;
                        d.volume = a._volume * r.volume();
                        d.playbackRate = a._rate;
                        try {
                            var o = d.play();
                            if (typeof Promise != "undefined" && o instanceof Promise) {
                                n._playLock = true;
                                var i = function() {
                                    n._playLock = false;
                                    t || n._emit("play", a._id);
                                };
                                o.then(i, i);
                            } else {
                                t || n._emit("play", a._id);
                            }
                            d.playbackRate = a._rate;
                            if (d.paused) {
                                return void n._emit("playerror", a._id, "Playback was unable to start. This is most commonly an issue on mobile devices where playback was not within a user interaction.");
                            }
                            if ("__default" !== e || a._loop) {
                                n._endTimers[a._id] = setTimeout(n._ended.bind(n, a), p);
                            } else {
                                n._endTimers[a._id] = function() {
                                    n._ended(a);
                                    d.removeEventListener("ended", n._endTimers[a._id], false);
                                };
                                d.addEventListener("ended", n._endTimers[a._id], false);
                            }
                        } catch (s) {
                            n._emit("playerror", a._id, s);
                        }
                    }, m = window && window.ejecta || !d.readyState && r._navigator.isCocoonJS;
                    if (d.readyState >= 3 || m) {
                        f();
                    } else {
                        var g = function() {
                            f();
                            d.removeEventListener(r._canPlayEvent, g, false);
                        };
                        d.addEventListener(r._canPlayEvent, g, false);
                        n._clearTimer(a._id);
                    }
                }
                return a._id;
            },
            pause: function(e) {
                var t = this;
                if ("loaded" !== t._state || t._playLock) {
                    t._queue.push({
                        event: "pause",
                        action: function() {
                            t.pause(e);
                        }
                    });
                    return t;
                }
                for (var n = t._getSoundIds(e), r = 0; r < n.length; r++) {
                    t._clearTimer(n[r]);
                    var o = t._soundById(n[r]);
                    if (o && !o._paused && (o._seek = t.seek(n[r]), o._rateSeek = 0, o._paused = true, 
                    t._stopFade(n[r]), o._node)) {
                        if (t._webAudio) {
                            if (!o._node.bufferSource) {
                                continue;
                            }
                            if (typeof o._node.bufferSource.stop == "undefined") {
                                o._node.bufferSource.noteOff(0);
                            } else {
                                o._node.bufferSource.stop(0);
                            }
                            t._cleanBuffer(o._node);
                        } else {
                            isNaN(o._node.duration) && o._node.duration !== 1 / 0 || o._node.pause();
                        }
                    }
                    arguments[1] || t._emit("pause", o ? o._id : null);
                }
                return t;
            },
            stop: function(e, t) {
                var n = this;
                if ("loaded" !== n._state) {
                    n._queue.push({
                        event: "stop",
                        action: function() {
                            n.stop(e);
                        }
                    });
                    return n;
                }
                for (var r = n._getSoundIds(e), o = 0; o < r.length; o++) {
                    n._clearTimer(r[o]);
                    var i = n._soundById(r[o]);
                    if (i) {
                        i._seek = i._start || 0, i._rateSeek = 0, i._paused = true, i._ended = true, n._stopFade(r[o]), 
                        i._node && (n._webAudio ? i._node.bufferSource && (typeof i._node.bufferSource.stop == "undefined" ? i._node.bufferSource.noteOff(0) : i._node.bufferSource.stop(0), 
                        n._cleanBuffer(i._node)) : isNaN(i._node.duration) && i._node.duration !== 1 / 0 || (i._node.currentTime = i._start || 0, 
                        i._node.pause())), t || n._emit("stop", i._id)
                    };
                }
                return n;
            },
            mute: function(e, t) {
                var n = this;
                if ("loaded" !== n._state) {
                    n._queue.push({
                        event: "mute",
                        action: function() {
                            n.mute(e, t);
                        }
                    });
                    return n;
                }
                if (typeof t == "undefined") {
                    if (typeof e != "boolean") {
                        return n._muted;
                    }
                    n._muted = e;
                }
                for (var o = n._getSoundIds(t), i = 0; i < o.length; i++) {
                    var s = n._soundById(o[i]);
                    if (s) {
                        s._muted = e, s._interval && n._stopFade(s._id), n._webAudio && s._node ? s._node.gain.setValueAtTime(e ? 0 : s._volume, r.ctx.currentTime) : s._node && (s._node.muted = r._muted ? true : e), 
                        n._emit("mute", s._id)
                    };
                }
                return n;
            },
            volume: function() {
                var e, t, n = this, o = arguments;
                if (o.length === 0) {
                    return n._volume;
                }
                if (o.length === 1 || o.length === 2 && typeof o[1] == "undefined") {
                    var i = n._getSoundIds(), s = i.indexOf(o[0]);
                    if (s >= 0) {
                        t = parseInt(o[0], 10);
                    } else {
                        e = parseFloat(o[0]);
                    }
                } else {
                    if (o.length >= 2) {
                        e = parseFloat(o[0]), t = parseInt(o[1], 10)
                    };
                }
                var a;
                if (!(typeof e != "undefined" && e >= 0 && e <= 1)) {
                    a = t ? n._soundById(t) : n._sounds[0];
                    if (a) {
                        return a._volume;
                    }
                    return 0;
                }
                if ("loaded" !== n._state) {
                    n._queue.push({
                        event: "volume",
                        action: function() {
                            n.volume.apply(n, o);
                        }
                    });
                    return n;
                }
                if (typeof t == "undefined") {
                    n._volume = e
                };
                t = n._getSoundIds(t);
                for (var u = 0; u < t.length; u++) {
                    a = n._soundById(t[u]);
                    if (a) {
                        a._volume = e, o[2] || n._stopFade(t[u]), n._webAudio && a._node && !a._muted ? a._node.gain.setValueAtTime(e, r.ctx.currentTime) : a._node && !a._muted && (a._node.volume = e * r.volume()), 
                        n._emit("volume", a._id)
                    };
                }
                return n;
            },
            fade: function(e, t, n, o) {
                var i = this;
                if ("loaded" !== i._state) {
                    i._queue.push({
                        event: "fade",
                        action: function() {
                            i.fade(e, t, n, o);
                        }
                    });
                    return i;
                }
                i.volume(e, o);
                for (var s = i._getSoundIds(o), a = 0; a < s.length; a++) {
                    var u = i._soundById(s[a]);
                    if (u) {
                        o || i._stopFade(s[a]);
                        if (i._webAudio && !u._muted) {
                            var l = r.ctx.currentTime, c = l + n / 1e3;
                            u._volume = e;
                            u._node.gain.setValueAtTime(e, l);
                            u._node.gain.linearRampToValueAtTime(t, c);
                        }
                        i._startFadeInterval(u, e, t, n, s[a], typeof o == "undefined");
                    }
                }
                return i;
            },
            _startFadeInterval: function(e, t, n, r, o, i) {
                var s = this, a = t, u = n - t, l = Math.abs(u / .01), c = Math.max(4, l > 0 ? r / l : r), p = Date.now();
                e._fadeTo = n;
                e._interval = setInterval(function() {
                    var o = (Date.now() - p) / r;
                    p = Date.now();
                    a += u * o;
                    a = Math.max(0, a);
                    a = Math.min(1, a);
                    a = Math.round(100 * a) / 100;
                    if (s._webAudio) {
                        e._volume = a;
                    } else {
                        s.volume(a, e._id, true);
                    }
                    if (i) {
                        s._volume = a
                    };
                    if (t > n && n >= a || n > t && a >= n) {
                        clearInterval(e._interval), e._interval = null, e._fadeTo = null, s.volume(n, e._id), 
                        s._emit("fade", e._id)
                    };
                }, c);
            },
            _stopFade: function(e) {
                var t = this, n = t._soundById(e);
                if (n && n._interval) {
                    t._webAudio && n._node.gain.cancelScheduledValues(r.ctx.currentTime), clearInterval(n._interval), 
                    n._interval = null, t.volume(n._fadeTo, e), n._fadeTo = null, t._emit("fade", e)
                };
                return t;
            },
            loop: function() {
                var e, t, n, r = this, o = arguments;
                if (o.length === 0) {
                    return r._loop;
                }
                if (o.length === 1) {
                    if (typeof o[0] != "boolean") {
                        n = r._soundById(parseInt(o[0], 10));
                        if (n) {
                            return n._loop;
                        }
                        return false;
                    }
                    e = o[0];
                    r._loop = e;
                } else {
                    if (o.length === 2) {
                        e = o[0], t = parseInt(o[1], 10)
                    };
                }
                for (var i = r._getSoundIds(t), s = 0; s < i.length; s++) {
                    n = r._soundById(i[s]);
                    if (n) {
                        n._loop = e, r._webAudio && n._node && n._node.bufferSource && (n._node.bufferSource.loop = e, 
                        e && (n._node.bufferSource.loopStart = n._start || 0, n._node.bufferSource.loopEnd = n._stop))
                    };
                }
                return r;
            },
            rate: function() {
                var e, t, n = this, o = arguments;
                if (o.length === 0) {
                    t = n._sounds[0]._id;
                } else if (o.length === 1) {
                    var i = n._getSoundIds(), s = i.indexOf(o[0]);
                    if (s >= 0) {
                        t = parseInt(o[0], 10);
                    } else {
                        e = parseFloat(o[0]);
                    }
                } else {
                    if (o.length === 2) {
                        e = parseFloat(o[0]), t = parseInt(o[1], 10)
                    };
                }
                var a;
                if (typeof e != "number") {
                    a = n._soundById(t);
                    if (a) {
                        return a._rate;
                    }
                    return n._rate;
                }
                if ("loaded" !== n._state) {
                    n._queue.push({
                        event: "rate",
                        action: function() {
                            n.rate.apply(n, o);
                        }
                    });
                    return n;
                }
                if (typeof t == "undefined") {
                    n._rate = e
                };
                t = n._getSoundIds(t);
                for (var u = 0; u < t.length; u++) {
                    if (a = n._soundById(t[u])) {
                        a._rateSeek = n.seek(t[u]);
                        a._playStart = n._webAudio ? r.ctx.currentTime : a._playStart;
                        a._rate = e;
                        if (n._webAudio && a._node && a._node.bufferSource) {
                            a._node.bufferSource.playbackRate.setValueAtTime(e, r.ctx.currentTime);
                        } else {
                            if (a._node) {
                                a._node.playbackRate = e
                            };
                        }
                        var l = n.seek(t[u]), c = (n._sprite[a._sprite][0] + n._sprite[a._sprite][1]) / 1e3 - l, p = 1e3 * c / Math.abs(a._rate);
                        if (n._endTimers[t[u]] || !a._paused) {
                            n._clearTimer(t[u]), n._endTimers[t[u]] = setTimeout(n._ended.bind(n, a), p)
                        };
                        n._emit("rate", a._id);
                    }
                }
                return n;
            },
            seek: function() {
                var e, t, n = this, o = arguments;
                if (o.length === 0) {
                    t = n._sounds[0]._id;
                } else if (o.length === 1) {
                    var i = n._getSoundIds(), s = i.indexOf(o[0]);
                    if (s >= 0) {
                        t = parseInt(o[0], 10);
                    } else {
                        if (n._sounds.length) {
                            t = n._sounds[0]._id, e = parseFloat(o[0])
                        };
                    }
                } else {
                    if (o.length === 2) {
                        e = parseFloat(o[0]), t = parseInt(o[1], 10)
                    };
                }
                if (typeof t == "undefined") {
                    return n;
                }
                if ("loaded" !== n._state) {
                    n._queue.push({
                        event: "seek",
                        action: function() {
                            n.seek.apply(n, o);
                        }
                    });
                    return n;
                }
                var a = n._soundById(t);
                if (a) {
                    if (!(typeof e == "number" && e >= 0)) {
                        if (n._webAudio) {
                            var u = n.playing(t) ? r.ctx.currentTime - a._playStart : 0, l = a._rateSeek ? a._rateSeek - a._seek : 0;
                            return a._seek + (l + u * Math.abs(a._rate));
                        }
                        return a._node.currentTime;
                    }
                    var c = n.playing(t);
                    if (c) {
                        n.pause(t, true)
                    };
                    a._seek = e;
                    a._ended = false;
                    n._clearTimer(t);
                    if (c) {
                        n.play(t, true)
                    };
                    if (!n._webAudio && a._node) {
                        a._node.currentTime = e
                    };
                    if (c && !n._webAudio) {
                        var p = function() {
                            if (n._playLock) {
                                setTimeout(p, 0);
                            } else {
                                n._emit("seek", t);
                            }
                        };
                        setTimeout(p, 0);
                    } else {
                        n._emit("seek", t);
                    }
                }
                return n;
            },
            playing: function(e) {
                var t = this;
                if (typeof e == "number") {
                    var n = t._soundById(e);
                    if (n) {
                        return !n._paused;
                    }
                    return false;
                }
                for (var r = 0; r < t._sounds.length; r++) {
                    if (!t._sounds[r]._paused) {
                        return true;
                    }
                }
                return false;
            },
            duration: function(e) {
                var t = this, n = t._duration, r = t._soundById(e);
                if (r) {
                    n = t._sprite[r._sprite][1] / 1e3
                };
                return n;
            },
            state: function() {
                return this._state;
            },
            unload: function() {
                for (var e = this, t = e._sounds, n = 0; n < t.length; n++) {
                    t[n]._paused || e.stop(t[n]._id);
                    if (!e._webAudio) {
                        var o = /MSIE |Trident\//.test(r._navigator && r._navigator.userAgent);
                        o || (t[n]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
                        t[n]._node.removeEventListener("error", t[n]._errorFn, false);
                        t[n]._node.removeEventListener(r._canPlayEvent, t[n]._loadFn, false);
                    }
                    delete t[n]._node;
                    e._clearTimer(t[n]._id);
                    var i = r._howls.indexOf(e);
                    if (i >= 0) {
                        r._howls.splice(i, 1)
                    };
                }
                var a = true;
                for (n = 0; n < r._howls.length; n++) {
                    if (r._howls[n]._src === e._src) {
                        a = false;
                        break;
                    }
                }
                if (s && a) {
                    delete s[e._src]
                };
                r.noAudio = false;
                e._state = "unloaded";
                e._sounds = [];
                e = null;
                return null;
            },
            on: function(e, t, n, r) {
                var o = this, i = o["_on" + e];
                if (typeof t == "function") {
                    i.push(r ? {
                        id: n,
                        fn: t,
                        once: r
                    } : {
                        id: n,
                        fn: t
                    })
                };
                return o;
            },
            off: function(e, t, n) {
                var r = this, o = r["_on" + e], i = 0;
                if (typeof t == "number") {
                    n = t, t = null
                };
                if (t || n) {
                    for (i = 0; i < o.length; i++) {
                        var s = n === o[i].id;
                        if (t === o[i].fn && s || !t && s) {
                            o.splice(i, 1);
                            break;
                        }
                    }
                } else if (e) {
                    r["_on" + e] = [];
                } else {
                    var a = Object.keys(r);
                    for (i = 0; i < a.length; i++) {
                        if (a[i].indexOf("_on") === 0 && Array.isArray(r[a[i]])) {
                            r[a[i]] = []
                        };
                    }
                }
                return r;
            },
            once: function(e, t, n) {
                var r = this;
                r.on(e, t, n, 1);
                return r;
            },
            _emit: function(e, t, n) {
                for (var r = this, o = r["_on" + e], i = o.length - 1; i >= 0; i--) {
                    o[i].id && o[i].id !== t && "load" !== e || (setTimeout(function(e) {
                        e.call(this, t, n);
                    }.bind(r, o[i].fn), 0), o[i].once && r.off(e, o[i].fn, o[i].id));
                }
                r._loadQueue(e);
                return r;
            },
            _loadQueue: function(e) {
                var t = this;
                if (t._queue.length > 0) {
                    var n = t._queue[0];
                    if (n.event === e) {
                        t._queue.shift(), t._loadQueue()
                    };
                    e || n.action();
                }
                return t;
            },
            _ended: function(e) {
                var t = this, n = e._sprite;
                if (!t._webAudio && e._node && !e._node.paused && !e._node.ended && e._node.currentTime < e._stop) {
                    setTimeout(t._ended.bind(t, e), 100);
                    return t;
                }
                var o = !(!e._loop && !t._sprite[n][2]);
                t._emit("end", e._id);
                if (!t._webAudio && o) {
                    t.stop(e._id, true).play(e._id)
                };
                if (t._webAudio && o) {
                    t._emit("play", e._id);
                    e._seek = e._start || 0;
                    e._rateSeek = 0;
                    e._playStart = r.ctx.currentTime;
                    var i = 1e3 * (e._stop - e._start) / Math.abs(e._rate);
                    t._endTimers[e._id] = setTimeout(t._ended.bind(t, e), i);
                }
                if (t._webAudio && !o) {
                    e._paused = true, e._ended = true, e._seek = e._start || 0, e._rateSeek = 0, t._clearTimer(e._id), 
                    t._cleanBuffer(e._node), r._autoSuspend()
                };
                t._webAudio || o || t.stop(e._id);
                return t;
            },
            _clearTimer: function(e) {
                var t = this;
                if (t._endTimers[e]) {
                    if (typeof t._endTimers[e] != "function") {
                        clearTimeout(t._endTimers[e]);
                    } else {
                        var n = t._soundById(e);
                        if (n && n._node) {
                            n._node.removeEventListener("ended", t._endTimers[e], false)
                        };
                    }
                    delete t._endTimers[e];
                }
                return t;
            },
            _soundById: function(e) {
                for (var t = this, n = 0; n < t._sounds.length; n++) {
                    if (e === t._sounds[n]._id) {
                        return t._sounds[n];
                    }
                }
                return null;
            },
            _inactiveSound: function() {
                var e = this;
                e._drain();
                for (var t = 0; t < e._sounds.length; t++) {
                    if (e._sounds[t]._ended) {
                        return e._sounds[t].reset();
                    }
                }
                return new i(e);
            },
            _drain: function() {
                var e = this, t = e._pool, n = 0, r = 0;
                if (!(e._sounds.length < t)) {
                    for (r = 0; r < e._sounds.length; r++) {
                        if (e._sounds[r]._ended) {
                            n++
                        };
                    }
                    for (r = e._sounds.length - 1; r >= 0; r--) {
                        if (t >= n) {
                            return;
                        }
                        if (e._sounds[r]._ended) {
                            e._webAudio && e._sounds[r]._node && e._sounds[r]._node.disconnect(0), e._sounds.splice(r, 1), 
                            n--
                        };
                    }
                }
            },
            _getSoundIds: function(e) {
                var t = this;
                if (typeof e == "undefined") {
                    for (var n = [], r = 0; r < t._sounds.length; r++) {
                        n.push(t._sounds[r]._id);
                    }
                    return n;
                }
                return [ e ];
            },
            _refreshBuffer: function(e) {
                var t = this;
                e._node.bufferSource = r.ctx.createBufferSource();
                e._node.bufferSource.buffer = s[t._src];
                if (e._panner) {
                    e._node.bufferSource.connect(e._panner);
                } else {
                    e._node.bufferSource.connect(e._node);
                }
                e._node.bufferSource.loop = e._loop;
                if (e._loop) {
                    e._node.bufferSource.loopStart = e._start || 0, e._node.bufferSource.loopEnd = e._stop
                };
                e._node.bufferSource.playbackRate.setValueAtTime(e._rate, r.ctx.currentTime);
                return t;
            },
            _cleanBuffer: function(e) {
                var t = this;
                if (r._scratchBuffer) {
                    e.bufferSource.onended = null;
                    e.bufferSource.disconnect(0);
                    try {
                        e.bufferSource.buffer = r._scratchBuffer;
                    } catch (n) {}
                }
                e.bufferSource = null;
                return t;
            }
        };
        var i = function(e) {
            this._parent = e;
            this.init();
        };
        i.prototype = {
            init: function() {
                var e = this, t = e._parent;
                e._muted = t._muted;
                e._loop = t._loop;
                e._volume = t._volume;
                e._rate = t._rate;
                e._seek = 0;
                e._paused = true;
                e._ended = true;
                e._sprite = "__default";
                e._id = ++r._counter;
                t._sounds.push(e);
                e.create();
                return e;
            },
            create: function() {
                var e = this, t = e._parent, n = r._muted || e._muted || e._parent._muted ? 0 : e._volume;
                if (t._webAudio) {
                    e._node = typeof r.ctx.createGain == "undefined" ? r.ctx.createGainNode() : r.ctx.createGain();
                    e._node.gain.setValueAtTime(n, r.ctx.currentTime);
                    e._node.paused = true;
                    e._node.connect(r.masterGain);
                } else {
                    e._node = new Audio();
                    e._errorFn = e._errorListener.bind(e);
                    e._node.addEventListener("error", e._errorFn, false);
                    e._loadFn = e._loadListener.bind(e);
                    e._node.addEventListener(r._canPlayEvent, e._loadFn, false);
                    e._node.src = t._src;
                    e._node.preload = "auto";
                    e._node.volume = n * r.volume();
                    e._node.load();
                }
                return e;
            },
            reset: function() {
                var e = this, t = e._parent;
                e._muted = t._muted;
                e._loop = t._loop;
                e._volume = t._volume;
                e._rate = t._rate;
                e._seek = 0;
                e._rateSeek = 0;
                e._paused = true;
                e._ended = true;
                e._sprite = "__default";
                e._id = ++r._counter;
                return e;
            },
            _errorListener: function() {
                var e = this;
                e._parent._emit("loaderror", e._id, e._node.error ? e._node.error.code : 0);
                e._node.removeEventListener("error", e._errorFn, false);
            },
            _loadListener: function() {
                var e = this, t = e._parent;
                t._duration = Math.ceil(10 * e._node.duration) / 10;
                if (Object.keys(t._sprite).length === 0) {
                    t._sprite = {
                        __default: [ 0, 1e3 * t._duration ]
                    }
                };
                if ("loaded" !== t._state) {
                    t._state = "loaded", t._emit("load"), t._loadQueue()
                };
                e._node.removeEventListener(r._canPlayEvent, e._loadFn, false);
            }
        };
        var s = {}, a = function(e) {
            var t = e._src;
            if (s[t]) {
                e._duration = s[t].duration;
                return void c(e);
            }
            if (/^data:[^;]+;base64,/.test(t)) {
                for (var n = atob(t.split(",")[1]), r = new Uint8Array(n.length), o = 0; o < n.length; ++o) {
                    r[o] = n.charCodeAt(o);
                }
                l(r.buffer, e);
            } else {
                var i = new XMLHttpRequest();
                i.open("GET", t, true);
                i.withCredentials = e._xhrWithCredentials;
                i.responseType = "arraybuffer";
                i.onload = function() {
                    var t = (i.status + "")[0];
                    if ("0" !== t && "2" !== t && "3" !== t) {
                        return void e._emit("loaderror", null, "Failed loading audio file with status: " + i.status + ".");
                    }
                    return void l(i.response, e);
                };
                i.onerror = function() {
                    if (e._webAudio) {
                        e._html5 = true, e._webAudio = false, e._sounds = [], delete s[t], e.load()
                    };
                };
                u(i);
            }
        }, u = function(e) {
            try {
                e.send();
            } catch (t) {
                e.onerror();
            }
        }, l = function(e, t) {
            r.ctx.decodeAudioData(e, function(e) {
                if (e && t._sounds.length > 0) {
                    s[t._src] = e, c(t, e)
                };
            }, function() {
                t._emit("loaderror", null, "Decoding audio data failed.");
            });
        }, c = function(e, t) {
            if (t && !e._duration) {
                e._duration = t.duration
            };
            if (Object.keys(e._sprite).length === 0) {
                e._sprite = {
                    __default: [ 0, 1e3 * e._duration ]
                }
            };
            if ("loaded" !== e._state) {
                e._state = "loaded", e._emit("load"), e._loadQueue()
            };
        }, p = function() {
            try {
                if (typeof AudioContext != "undefined") {
                    r.ctx = new AudioContext();
                } else {
                    if (typeof webkitAudioContext != "undefined") {
                        r.ctx = new webkitAudioContext();
                    } else {
                        r.usingWebAudio = false;
                    }
                }
            } catch (e) {
                r.usingWebAudio = !1;
            }
            var t = /iP(hone|od|ad)/.test(r._navigator && r._navigator.platform), n = r._navigator && r._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), o = n ? parseInt(n[1], 10) : null;
            if (t && o && o < 9) {
                var i = /safari/.test(r._navigator && r._navigator.userAgent.toLowerCase());
                if (r._navigator && r._navigator.standalone && !i || r._navigator && !r._navigator.standalone && !i) {
                    r.usingWebAudio = false
                };
            }
            if (r.usingWebAudio) {
                r.masterGain = typeof r.ctx.createGain == "undefined" ? r.ctx.createGainNode() : r.ctx.createGain(), 
                r.masterGain.gain.setValueAtTime(r._muted ? 0 : 1, r.ctx.currentTime), r.masterGain.connect(r.ctx.destination)
            };
            r._setup();
        };
        if (typeof define == "function" && define.amd) {
            define([], function() {
                return {
                    Howler: r,
                    Howl: o
                };
            })
        };
        if (typeof exports != "undefined") {
            exports.Howler = r, exports.Howl = o
        };
        if (typeof window != "undefined") {
            window.HowlerGlobal = t;
            window.Howler = r;
            window.Howl = o;
            window.Sound = i;
        } else {
            if (typeof e != "undefined") {
                e.HowlerGlobal = t, e.Howler = r, e.Howl = o, e.Sound = i
            };
        }
    }();
    (function() {
        "use strict";
        HowlerGlobal.prototype._pos = [ 0, 0, 0 ];
        HowlerGlobal.prototype._orientation = [ 0, 0, -1, 0, 1, 0 ];
        HowlerGlobal.prototype.stereo = function(e) {
            var t = this;
            if (!t.ctx || !t.ctx.listener) {
                return t;
            }
            for (var n = t._howls.length - 1; n >= 0; n--) {
                t._howls[n].stereo(e);
            }
            return t;
        };
        HowlerGlobal.prototype.pos = function(e, t, n) {
            var r = this;
            if (r.ctx && r.ctx.listener) {
                t = typeof t != "number" ? r._pos[1] : t;
                n = typeof n != "number" ? r._pos[2] : n;
                if (typeof e != "number") {
                    return r._pos;
                }
                r._pos = [ e, t, n ];
                if (typeof r.ctx.listener.positionX != "undefined") {
                    r.ctx.listener.positionX.setTargetAtTime(r._pos[0], Howler.ctx.currentTime, .1);
                    r.ctx.listener.positionY.setTargetAtTime(r._pos[1], Howler.ctx.currentTime, .1);
                    r.ctx.listener.positionZ.setTargetAtTime(r._pos[2], Howler.ctx.currentTime, .1);
                } else {
                    r.ctx.listener.setPosition(r._pos[0], r._pos[1], r._pos[2]);
                }
                return r;
            }
            return r;
        };
        HowlerGlobal.prototype.orientation = function(e, t, n, r, o, i) {
            var s = this;
            if (!s.ctx || !s.ctx.listener) {
                return s;
            }
            var a = s._orientation;
            t = typeof t != "number" ? a[1] : t;
            n = typeof n != "number" ? a[2] : n;
            r = typeof r != "number" ? a[3] : r;
            o = typeof o != "number" ? a[4] : o;
            i = typeof i != "number" ? a[5] : i;
            if (typeof e != "number") {
                return a;
            }
            s._orientation = [ e, t, n, r, o, i ];
            if (typeof s.ctx.listener.forwardX != "undefined") {
                s.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1);
                s.ctx.listener.forwardY.setTargetAtTime(t, Howler.ctx.currentTime, .1);
                s.ctx.listener.forwardZ.setTargetAtTime(n, Howler.ctx.currentTime, .1);
                s.ctx.listener.upX.setTargetAtTime(e, Howler.ctx.currentTime, .1);
                s.ctx.listener.upY.setTargetAtTime(t, Howler.ctx.currentTime, .1);
                s.ctx.listener.upZ.setTargetAtTime(n, Howler.ctx.currentTime, .1);
            } else {
                s.ctx.listener.setOrientation(e, t, n, r, o, i);
            }
            return s;
        };
        Howl.prototype.init = function(e) {
            return function(t) {
                var n = this;
                n._orientation = t.orientation || [ 1, 0, 0 ];
                n._stereo = t.stereo || null;
                n._pos = t.pos || null;
                n._pannerAttr = {
                    coneInnerAngle: typeof t.coneInnerAngle != "undefined" ? t.coneInnerAngle : 360,
                    coneOuterAngle: typeof t.coneOuterAngle != "undefined" ? t.coneOuterAngle : 360,
                    coneOuterGain: typeof t.coneOuterGain != "undefined" ? t.coneOuterGain : 0,
                    distanceModel: typeof t.distanceModel != "undefined" ? t.distanceModel : "inverse",
                    maxDistance: typeof t.maxDistance != "undefined" ? t.maxDistance : 1e4,
                    panningModel: typeof t.panningModel != "undefined" ? t.panningModel : "HRTF",
                    refDistance: typeof t.refDistance != "undefined" ? t.refDistance : 1,
                    rolloffFactor: typeof t.rolloffFactor != "undefined" ? t.rolloffFactor : 1
                };
                n._onstereo = t.onstereo ? [ {
                    fn: t.onstereo
                } ] : [];
                n._onpos = t.onpos ? [ {
                    fn: t.onpos
                } ] : [];
                n._onorientation = t.onorientation ? [ {
                    fn: t.onorientation
                } ] : [];
                return e.call(this, t);
            };
        }(Howl.prototype.init);
        Howl.prototype.stereo = function(t, n) {
            var r = this;
            if (!r._webAudio) {
                return r;
            }
            if ("loaded" !== r._state) {
                r._queue.push({
                    event: "stereo",
                    action: function() {
                        r.stereo(t, n);
                    }
                });
                return r;
            }
            var o = typeof Howler.ctx.createStereoPanner == "undefined" ? "spatial" : "stereo";
            if (typeof n == "undefined") {
                if (typeof t != "number") {
                    return r._stereo;
                }
                r._stereo = t;
                r._pos = [ t, 0, 0 ];
            }
            for (var i = r._getSoundIds(n), s = 0; s < i.length; s++) {
                var a = r._soundById(i[s]);
                if (a) {
                    if (typeof t != "number") {
                        return a._stereo;
                    }
                    a._stereo = t;
                    a._pos = [ t, 0, 0 ];
                    if (a._node) {
                        a._pannerAttr.panningModel = "equalpower", a._panner && a._panner.pan || e(a, o), 
                        o === "spatial" ? typeof a._panner.positionX != "undefined" ? (a._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), 
                        a._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), a._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : a._panner.setPosition(t, 0, 0) : a._panner.pan.setValueAtTime(t, Howler.ctx.currentTime)
                    };
                    r._emit("stereo", a._id);
                }
            }
            return r;
        };
        Howl.prototype.pos = function(t, n, r, o) {
            var i = this;
            if (!i._webAudio) {
                return i;
            }
            if ("loaded" !== i._state) {
                i._queue.push({
                    event: "pos",
                    action: function() {
                        i.pos(t, n, r, o);
                    }
                });
                return i;
            }
            n = typeof n != "number" ? 0 : n;
            r = typeof r != "number" ? -.5 : r;
            if (typeof o == "undefined") {
                if (typeof t != "number") {
                    return i._pos;
                }
                i._pos = [ t, n, r ];
            }
            for (var s = i._getSoundIds(o), a = 0; a < s.length; a++) {
                var u = i._soundById(s[a]);
                if (u) {
                    if (typeof t != "number") {
                        return u._pos;
                    }
                    u._pos = [ t, n, r ];
                    if (u._node) {
                        (!u._panner || u._panner.pan) && e(u, "spatial"), typeof u._panner.positionX != "undefined" ? (u._panner.positionX.setValueAtTime(t, Howler.ctx.currentTime), 
                        u._panner.positionY.setValueAtTime(n, Howler.ctx.currentTime), u._panner.positionZ.setValueAtTime(r, Howler.ctx.currentTime)) : u._panner.setOrientation(t, n, r)
                    };
                    i._emit("pos", u._id);
                }
            }
            return i;
        };
        Howl.prototype.orientation = function(t, n, r, o) {
            var i = this;
            if (!i._webAudio) {
                return i;
            }
            if ("loaded" !== i._state) {
                i._queue.push({
                    event: "orientation",
                    action: function() {
                        i.orientation(t, n, r, o);
                    }
                });
                return i;
            }
            n = typeof n != "number" ? i._orientation[1] : n;
            r = typeof r != "number" ? i._orientation[2] : r;
            if (typeof o == "undefined") {
                if (typeof t != "number") {
                    return i._orientation;
                }
                i._orientation = [ t, n, r ];
            }
            for (var s = i._getSoundIds(o), a = 0; a < s.length; a++) {
                var u = i._soundById(s[a]);
                if (u) {
                    if (typeof t != "number") {
                        return u._orientation;
                    }
                    u._orientation = [ t, n, r ];
                    if (u._node) {
                        u._panner || (u._pos || (u._pos = i._pos || [ 0, 0, -.5 ]), e(u, "spatial")), u._panner.orientationX.setValueAtTime(t, Howler.ctx.currentTime), 
                        u._panner.orientationY.setValueAtTime(n, Howler.ctx.currentTime), u._panner.orientationZ.setValueAtTime(r, Howler.ctx.currentTime)
                    };
                    i._emit("orientation", u._id);
                }
            }
            return i;
        };
        Howl.prototype.pannerAttr = function() {
            var t, n, r, o = this, i = arguments;
            if (!o._webAudio) {
                return o;
            }
            if (i.length === 0) {
                return o._pannerAttr;
            }
            if (i.length === 1) {
                if (typeof i[0] != "object") {
                    r = o._soundById(parseInt(i[0], 10));
                    if (r) {
                        return r._pannerAttr;
                    }
                    return o._pannerAttr;
                }
                t = i[0];
                if (typeof n == "undefined") {
                    t.pannerAttr || (t.pannerAttr = {
                        coneInnerAngle: t.coneInnerAngle,
                        coneOuterAngle: t.coneOuterAngle,
                        coneOuterGain: t.coneOuterGain,
                        distanceModel: t.distanceModel,
                        maxDistance: t.maxDistance,
                        refDistance: t.refDistance,
                        rolloffFactor: t.rolloffFactor,
                        panningModel: t.panningModel
                    }), o._pannerAttr = {
                        coneInnerAngle: typeof t.pannerAttr.coneInnerAngle != "undefined" ? t.pannerAttr.coneInnerAngle : o._coneInnerAngle,
                        coneOuterAngle: typeof t.pannerAttr.coneOuterAngle != "undefined" ? t.pannerAttr.coneOuterAngle : o._coneOuterAngle,
                        coneOuterGain: typeof t.pannerAttr.coneOuterGain != "undefined" ? t.pannerAttr.coneOuterGain : o._coneOuterGain,
                        distanceModel: typeof t.pannerAttr.distanceModel != "undefined" ? t.pannerAttr.distanceModel : o._distanceModel,
                        maxDistance: typeof t.pannerAttr.maxDistance != "undefined" ? t.pannerAttr.maxDistance : o._maxDistance,
                        refDistance: typeof t.pannerAttr.refDistance != "undefined" ? t.pannerAttr.refDistance : o._refDistance,
                        rolloffFactor: typeof t.pannerAttr.rolloffFactor != "undefined" ? t.pannerAttr.rolloffFactor : o._rolloffFactor,
                        panningModel: typeof t.pannerAttr.panningModel != "undefined" ? t.pannerAttr.panningModel : o._panningModel
                    }
                };
            } else {
                if (i.length === 2) {
                    t = i[0], n = parseInt(i[1], 10)
                };
            }
            for (var s = o._getSoundIds(n), a = 0; a < s.length; a++) {
                if (r = o._soundById(s[a])) {
                    var u = r._pannerAttr;
                    u = {
                        coneInnerAngle: typeof t.coneInnerAngle != "undefined" ? t.coneInnerAngle : u.coneInnerAngle,
                        coneOuterAngle: typeof t.coneOuterAngle != "undefined" ? t.coneOuterAngle : u.coneOuterAngle,
                        coneOuterGain: typeof t.coneOuterGain != "undefined" ? t.coneOuterGain : u.coneOuterGain,
                        distanceModel: typeof t.distanceModel != "undefined" ? t.distanceModel : u.distanceModel,
                        maxDistance: typeof t.maxDistance != "undefined" ? t.maxDistance : u.maxDistance,
                        refDistance: typeof t.refDistance != "undefined" ? t.refDistance : u.refDistance,
                        rolloffFactor: typeof t.rolloffFactor != "undefined" ? t.rolloffFactor : u.rolloffFactor,
                        panningModel: typeof t.panningModel != "undefined" ? t.panningModel : u.panningModel
                    };
                    var l = r._panner;
                    if (l) {
                        l.coneInnerAngle = u.coneInnerAngle;
                        l.coneOuterAngle = u.coneOuterAngle;
                        l.coneOuterGain = u.coneOuterGain;
                        l.distanceModel = u.distanceModel;
                        l.maxDistance = u.maxDistance;
                        l.refDistance = u.refDistance;
                        l.rolloffFactor = u.rolloffFactor;
                        l.panningModel = u.panningModel;
                    } else {
                        r._pos || (r._pos = o._pos || [ 0, 0, -.5 ]);
                        e(r, "spatial");
                    }
                }
            }
            return o;
        };
        Sound.prototype.init = function(e) {
            return function() {
                var t = this, n = t._parent;
                t._orientation = n._orientation;
                t._stereo = n._stereo;
                t._pos = n._pos;
                t._pannerAttr = n._pannerAttr;
                e.call(this);
                if (t._stereo) {
                    n.stereo(t._stereo);
                } else {
                    if (t._pos) {
                        n.pos(t._pos[0], t._pos[1], t._pos[2], t._id)
                    };
                }
            };
        }(Sound.prototype.init);
        Sound.prototype.reset = function(e) {
            return function() {
                var t = this, n = t._parent;
                t._orientation = n._orientation;
                t._pos = n._pos;
                t._pannerAttr = n._pannerAttr;
                return e.call(this);
            };
        }(Sound.prototype.reset);
        var e = function(e, t) {
            t = t || "spatial";
            if (t === "spatial") {
                e._panner = Howler.ctx.createPanner();
                e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle;
                e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle;
                e._panner.coneOuterGain = e._pannerAttr.coneOuterGain;
                e._panner.distanceModel = e._pannerAttr.distanceModel;
                e._panner.maxDistance = e._pannerAttr.maxDistance;
                e._panner.refDistance = e._pannerAttr.refDistance;
                e._panner.rolloffFactor = e._pannerAttr.rolloffFactor;
                e._panner.panningModel = e._pannerAttr.panningModel;
                if (typeof e._panner.positionX != "undefined") {
                    e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime);
                    e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime);
                    e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime);
                } else {
                    e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]);
                }
                if (typeof e._panner.orientationX != "undefined") {
                    e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime);
                    e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime);
                    e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime);
                } else {
                    e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2]);
                }
            } else {
                e._panner = Howler.ctx.createStereoPanner();
                e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime);
            }
            e._panner.connect(e._node);
            e._paused || e._parent.pause(e._id, true).play(e._id, true);
        };
    })();
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
