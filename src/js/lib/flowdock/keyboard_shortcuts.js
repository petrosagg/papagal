var r, o;

Flowdock.shortcutMap = {
    web: {
        esc: function() {
            return document.activeElement.blur();
        },
        "esc w": "closeTab",
        "esc u": "toggleUserList",
        "esc comma": "openPreferences",
        "esc numeric": "navigateToNthTab",
        "esc d": "quickMute",
        "esc up": "previousTab",
        "esc down": "nextTab",
        "esc n": "newTab",
        "esc t": "newTab",
        "esc f": "focusSearch",
        "esc i": "focusChat",
        "esc a": "unreadTab",
        "esc s": "switchSingleViewSide",
        "cmd+enter": "submitForm",
        "ctrl+enter": "submitForm",
        tab: function() {
            var e;
            if (window.lastFocusedInput != null) {
                e = window.lastFocusedInput.replace(/^[A-z]{1}/, function(e) {
                    return e.toUpperCase();
                });
                return "returnFocusTo" + e;
            }
        }
    },
    alwaysAvailable: {
        "?": "openHelp"
    },
    macGap: {
        "cmd+numeric": "navigateToNthTab",
        "ctrl+tab": "nextTab",
        "ctrl+shift+tab": "previousTab",
        "cmd+shift+bracketLeft": "nextTab",
        "cmd+shift+bracketRight": "previousTab"
    },
    winApp: {
        "ctrl+numeric": "navigateToNthTab",
        "ctrl+tab": "nextTab",
        "ctrl+shift+tab": "previousTab",
        "ctrl+f": "focusSearch",
        "ctrl+n": "newTab",
        "ctrl+t": "newTab",
        "ctrl+plus": (r = window.windowsApp) != null ? r.zoomIn : undefined,
        "ctrl+minus": (o = window.windowsApp) != null ? o.zoomOut : undefined
    }
};

Flowdock.KeyboardShortcuts = function() {
    function KeyboardShortcuts(e, t) {
        this.keydowns = e;
        this.shortcuts = t;
    }
    KeyboardShortcuts.build = function(e) {
        return new this(keydownsNotInInput, e);
    };
    KeyboardShortcuts.bind = function(t, n, r) {
        var o, i;
        if (r == null) {
            r = []
        };
        if (r.length === 0) {
            i = t.filter(KeyEvent.is(n[0]));
        } else {
            i = (o = Bacon.later(1e3, true), t.take(1).filter(KeyEvent.is(n[0])).takeUntil(o));
        }
        return i.flatMap(function(o) {
            if (n.length === 1) {
                return Bacon.once(o);
            }
            return KeyboardShortcuts.bind(t, n.slice(1), r.concat(o)).take(1);
        });
    };
    KeyboardShortcuts._isNotInput = function(e) {
        var t;
        t = e.target || e.srcElement;
        return !(t.tagName === "INPUT" || t.tagName === "SELECT" || t.tagName === "TEXTAREA" || t.contentEditable && (t.contentEditable === "true" || t.contentEditable === "plaintext-only"));
    };
    KeyboardShortcuts.keyStream = function() {
        return Bacon.mergeAll([ $(document).asEventStream("keydown").filter(function(e) {
            return !(e.altKey || e.shiftKey || e.which === 27);
        }), $(document).asEventStream("keydown").filter(function(e) {
            return e.which === 27;
        }).doAction(".preventDefault"), $(document).asEventStream("keypress").filter(function(e) {
            return e.altKey || e.shiftKey;
        }) ]);
    };
    KeyboardShortcuts.keyUpStream = function() {
        return Bacon.mergeAll([ $(document).asEventStream("keyup").filter(function(e) {
            return !(e.altKey || e.shiftKey || e.which === 27);
        }), $(document).asEventStream("keyup").filter(function(e) {
            return e.which === 27;
        }).doAction(".preventDefault") ]);
    };
    KeyboardShortcuts.prototype.when = function(t) {
        var n;
        n = t.flatMapLatest(function(e) {
            return function(t) {
                if (t) {
                    return e.keydowns;
                }
                return Bacon.never();
            };
        }(this));
        return new KeyboardShortcuts(n, this.shortcuts);
    };
    KeyboardShortcuts.prototype.toStream = function(t) {
        var n, r, o, i;
        if (t == null) {
            t = Bacon.constant(true)
        };
        r = this.keydowns.filter(function(e) {
            return e.which === 27 || Flowdock.KeyboardShortcuts._isNotInput(e);
        });
        r = r.merge(t.flatMapLatest(function(e) {
            return function(t) {
                if (t) {
                    return e.keydowns.filter(function(e) {
                        return KeyEvent.modifierDown(e);
                    });
                }
                return Bacon.never();
            };
        }(this)));
        i = function() {
            var t, i;
            t = this.shortcuts;
            i = [];
            for (o in t) {
                n = t[o];
                i.push(function(t) {
                    return function(n) {
                        return KeyboardShortcuts.bind(r, o.split(" ")).map(function(e) {
                            var r;
                            if (_.isFunction(n)) {
                                r = n.call(t, e);
                            } else {
                                r = n;
                            }
                            return new $.Event(e, {
                                action: r
                            });
                        });
                    };
                }(this)(n));
            }
            return i;
        }.call(this);
        return Bacon.mergeAll(i).throttle(50);
    };
    return KeyboardShortcuts;
}();

Flowdock.KeyboardShortcuts.toggleSingleViewStream = function() {
    var e, t, n;
    t = Flowdock.KeyboardShortcuts.keyUpStream();
    n = t.filter(KeyEvent.not("esc"));
    e = t.filter(KeyEvent.is("esc"));
    return e.flatMapLatest(function() {
        return Bacon.later(1e3).merge(n).map("reset").take(1).merge(Bacon.once("esc"));
    }).scan("reset", function(e, t) {
        if (e === "esc" && t === "esc") {
            return "double-esc";
        }
        return t;
    }).filter(function(e) {
        return e === "double-esc";
    }).map(function(e) {
        return new $.Event("keydown", {
            action: "toggleSingleView"
        });
    }).toEventStream();
};

Flowdock.KeyboardShortcuts.forMacGap = function() {
    return Bacon.mergeAll([ new Flowdock.KeyboardShortcuts($(document).asEventStream("keydown"), Flowdock.shortcutMap.macGap).toStream(), $(document).asEventStream("macgapNextTab").map(function(e) {
        e.action = "nextTab";
        return e;
    }), $(document).asEventStream("macgapPreviousTab").map(function(e) {
        e.action = "previousTab";
        return e;
    }), $(document).asEventStream("macgapActiveTab").map(function(e) {
        e.action = "activeTab";
        return e;
    }), $(document).asEventStream("macgapNextThread").map(function(e) {
        e.action = "nextThread";
        return e;
    }), $(document).asEventStream("macgapPreviousThread").map(function(e) {
        e.action = "previousThread";
        return e;
    }), $(document).asEventStream("macgapOpenTab").map(function(e) {
        e.action = "newTab";
        return e;
    }), $(document).asEventStream("macgapCloseTab").map(function(e) {
        e.action = "closeTab";
        return e;
    }), $(document).asEventStream("macgapOpenKeyboardHelp").map(function(e) {
        e.action = "openHelp";
        return e;
    }), $(document).asEventStream("macgapOpenChatCommandHelp").map(function(e) {
        e.action = "openChatCommandHelp";
        return e;
    }), $(window).asEventStream("macgapWantsToGoToPreferences").map(function(e) {
        e.action = "openPreferences";
        return e;
    }) ]);
};

Flowdock.KeyboardShortcuts.forWinApp = function() {
    var e;
    e = new Bacon.Bus();
    window.windowsApp.onShortcut = function(t) {
        return e.push(t);
    };
    return e.merge(new Flowdock.KeyboardShortcuts($(document).asEventStream("keydown"), Flowdock.shortcutMap.winApp).toStream());
};
