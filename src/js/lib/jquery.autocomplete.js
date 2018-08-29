!function(e) {
    e.fn.autoComplete = function(t) {
        if (window.addEventListener) {
            var n = {
                sort: true,
                reverse: false
            };
            e.extend(n, t);
            if (n.source instanceof Array) {
                n.words = function() {
                    return n.source;
                };
            } else {
                if (typeof n.source == "function") {
                    n.words = n.source
                };
            }
            return this.each(function() {
                function t(e) {
                    if (e.selectionStart) {
                        return e.selectionStart;
                    }
                    if (document.selection) {
                        e.focus();
                        var t = document.selection.createRange();
                        if (t == null) {
                            return 0;
                        }
                        var n = e.createTextRange(), r = n.duplicate();
                        n.moveToBookmark(t.getBookmark());
                        r.setEndPoint("EndToStart", n);
                        for (var o = 0, i = 0; i < r.text.length; i++) {
                            if (r.text.substr(i, 2) == "\r\n") {
                                o += 2, i++
                            };
                        }
                        return r.text.length + o;
                    }
                    return 0;
                }
                function r(e, t) {
                    for (var n = [], r = 0, o = e.length, i = t.length, s = 0; o >= s; s++) {
                        n[s] = [];
                        n[s][0] = s;
                    }
                    for (var a = 0; i >= a; a++) {
                        n[0][a] = a;
                    }
                    for (s = 1; o >= s; s++) {
                        for (a = 1; i >= a; a++) {
                            r = e[s] == t[a] ? 0 : 1;
                            var u = n[s - 1][a] + 1, l = n[s][a - 1] + 1, c = n[s - 1][a - 1] + r;
                            if (u > l) {
                                u = l
                            };
                            if (u > c) {
                                u = c
                            };
                            n[s][a] = u;
                            if (s > 1 && a > 1 && e[s] === t[a - 1] && e[s - 1] === t[a]) {
                                n[s][a] = Math.min(n[s][a], n[s - 2][a - 2] + r)
                            };
                        }
                    }
                    return n[o][i];
                }
                function o() {
                    var o = t(x), a = x.value.substr(0, o).match(/\s?([^\s]+)$/);
                    if (a) {
                        f = Helpers.replaceDiacritics(a[1])
                    };
                    if (!a || f.length < 1 || x.value.charAt(o) && !x.value.charAt(o).match(/\s/)) {
                        f = undefined;
                        return [];
                    }
                    var u, l = f.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
                    u = s() ? "^" + l + ".*" : ".*" + l.split("").reduce(function(e, t) {
                        if (e.slice(-1) === "\\") {
                            return e + t;
                        }
                        if (f[0] === e) {
                            return e + ".*" + t;
                        }
                        return e + ".{0,2}" + t;
                    }) + ".*";
                    var c = RegExp(u, "i"), p = function(e) {
                        return _.reduce(e.matches, function(e, t) {
                            return e || c.test(t);
                        }, false);
                    }, d = _.pluck(jQuery.grep(n.cachedWords, p), "word");
                    if (e.isFunction(n.sort)) {
                        d.sort(n.sort);
                    } else {
                        if (n.sort === true) {
                            d.sort();
                        } else {
                            if (d.length < 25) {
                                d.sort(function(e, t) {
                                    return r(f, e) - r(f, t);
                                })
                            };
                        }
                    }
                    if (n.sort != 1 && d.length < 100) {
                        var h, m = [], g = [], v = f.toLowerCase();
                        for (i = 0; i < d.length; i++) {
                            h = d[i].toLowerCase();
                            if (h == v) {
                                m.unshift(d[i]);
                            } else {
                                if (h.indexOf(v) == 0) {
                                    m.push(d[i]);
                                } else {
                                    g.push(d[i]);
                                }
                            }
                        }
                        d = m.concat(g);
                    }
                    return d;
                }
                function s() {
                    if (n.hiddenComplete) {
                        if (n.hiddenCompleteLimiter instanceof Array) {
                            if (n.hiddenCompleteLimiter.indexOf(f.charAt(0)) == -1) {
                                return true;
                            }
                        } else if (f.charAt(0) == n.hiddenCompleteLimiter) {
                            return true;
                        }
                    }
                    return false;
                }
                function a(t) {
                    if (selected != null) {
                        selected.removeClass("selected")
                    };
                    selected = e(t).addClass("selected");
                    selectedWord = selected.text();
                    for (var n = 0; n < tagFields.length; n++) {
                        if (tagFields[n].text() == selectedWord) {
                            m = n
                        };
                    }
                }
                function u() {
                    b = o();
                    var t = b.length;
                    b = b.slice(0, T);
                    C.empty().removeClass("has-more").attr("data-more", "").toggleClass("reversed", n.reverse);
                    tagFields = [];
                    if (b.length > 0) {
                        if (b.length == 1 && b[0] == f) {
                            return;
                        }
                        k = s();
                        if (k) {
                            if (n.excludeHidden != undefined) {
                                b = b.filter(function(e) {
                                    return n.excludeHidden.indexOf(e) === -1;
                                })
                            };
                            selectedWord = b[m];
                            c();
                        } else {
                            if (n.reverse) {
                                b.reverse()
                            };
                            b.forEach(function(t) {
                                field = e("<li class='ac'>");
                                if (typeof n.displayHtml == "function") {
                                    field.append(n.displayHtml(t));
                                } else {
                                    field.text(t);
                                }
                                C.append(field);
                                tagFields.push(field);
                            });
                            if (t > T) {
                                C.addClass("has-more").attr("data-more", "… and " + String(t - T) + " more. Narrow your search.")
                            };
                            if (typeof n.autoSelect != "function" || n.autoSelect(b[0])) {
                                if (n.reverse) {
                                    selected = tagFields[tagFields.length - 1].addClass("selected");
                                    selectedWord = selected.text();
                                    m = tagFields.length - 1;
                                } else {
                                    selected = tagFields[0].addClass("selected");
                                    selectedWord = selected.text();
                                    m = 0;
                                }
                            } else {
                                selected = selectedWord = m = undefined;
                            }
                            if (n.el) {
                                C.appendTo(n.el).show();
                            } else {
                                C.appendTo("body").show().css({
                                    bottom: e(window).height() - e(x).offset().top,
                                    left: e(x).offset().left,
                                    width: e(x).width()
                                });
                            }
                            w = true;
                            C.trigger("selector-open");
                            g = undefined;
                            if (n.reverse && tagFields.length > 0) {
                                C.scrollTop(C.find("li.ac:last-child")[0].offsetTop)
                            };
                        }
                    } else {
                        if (!n.emptyHook || !f || !C.is(":empty")) {
                            return;
                        }
                        var r = n.emptyHook(f);
                        if (r) {
                            w = true, C.trigger("selector-open"), C.append(r).show()
                        };
                    }
                    if (C.is(":empty")) {
                        C.hide()
                    };
                }
                function l() {
                    if (selected && selected.length != 0) {
                        selected.is(".ac:first-child") ? C.scrollTop(0) : selected.is(".ac:last-child") ? C.scrollTop(C[0].scrollHeight) : selected[0].offsetTop < C.scrollTop() ? C.scrollTop(selected[0].offsetTop) : selected[0].offsetTop + selected.outerHeight() > C.height() + C.scrollTop() && C.scrollTop(selected[0].offsetTop + selected.outerHeight() - C.height())
                    };
                }
                function c() {
                    y = v = m = g = selected = selectedWord = tagFields = undefined;
                    C.empty().hide();
                    w = false;
                    E = {};
                }
                function p() {
                    if (k && m + 1 < b.length) {
                        m += 1;
                    } else {
                        if (k) {
                            m = 0
                        };
                    }
                    if (g == undefined) {
                        g = t(x)
                    };
                    if (y == undefined) {
                        y = x.value.substr(g)
                    };
                    if (b[m] != undefined) {
                        if (n.completionHook) {
                            var e = g - f.length, r = n.completionHook(b[m], e);
                        } else {
                            var r = b[m];
                        }
                        var o = r.substr(f.length);
                        x.value = x.value.substr(0, g - f.length) + r + y;
                        v = g + o.length;
                        x.focus();
                        if (x.selectionStart) {
                            x.setSelectionRange(v, v);
                        } else if (x.createTextRange) {
                            var i = x.createTextRange();
                            i.collapse(true);
                            i.moveEnd("character", v);
                            i.moveStart("character", v);
                            i.select();
                        }
                        if (k) {
                            if (b.length == 1) {
                                b = []
                            };
                        } else {
                            c();
                        }
                    }
                }
                function d(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }
                function h(e) {
                    return e.altKey || e.ctrlKey || e.shiftKey;
                }
                var f, m, g, v, b, y, w, k, x = this, C = e('<ul id="autocomplete" class="autocompleter"></ul>'), E = {}, T = 50;
                e(x).bind("keydown", "Return", function(e) {
                    if (w && selected != null) {
                        p(), d(e)
                    };
                });
                e(x).bind("keydown", "Tab", function(e) {
                    if (w || k) {
                        e.preventDefault()
                    };
                });
                e(x).bind("keyup", function(e) {
                    if (!w || e.which != 38 && e.which != 40) {
                        if (e.which != 9 || h(e) || !w && !k) {
                            if (e.which == 39 && w) {
                                d(e);
                                c();
                            } else {
                                w = false;
                                C.hide();
                                u();
                            }
                        } else {
                            d(e);
                            p();
                        }
                    } else {
                        e.preventDefault();
                    }
                });
                e(x).bind("keydown", "Up", function(e) {
                    if (w) {
                        e.preventDefault(), selected == null ? (selected = C.children("li.ac").last().addClass("selected"), 
                        selectedWord = selected.text(), m = C.children("li.ac").length - 1) : selected.prev("li.ac").length > 0 ? (selected = selected.removeClass("selected").prev("li.ac").addClass("selected"), 
                        selectedWord = selected.text(), m--) : (selected != null && selected.removeClass("selected"), 
                        selected = selectedWord = m = undefined), l()
                    };
                });
                e(x).bind("keydown", "Down", function(e) {
                    if (w) {
                        e.preventDefault(), selected == null ? (selected = C.children("li.ac").first().addClass("selected"), 
                        selectedWord = selected.text(), m = 0) : selected.next("li.ac").length > 0 ? (selected = selected.removeClass("selected").next("li.ac").addClass("selected"), 
                        selectedWord = selected.text(), m++) : (selected != null && selected.removeClass("selected"), 
                        selected = selectedWord = m = undefined), l()
                    };
                });
                e(x).bind("blur", function(e) {
                    setTimeout(function() {
                        if (w) {
                            c()
                        };
                    }, 150);
                });
                C.bind("mousedown", function(e) {
                    return false;
                });
                e(x).bind("focus", function(e) {
                    n.cachedWords = n.words().map(function(e) {
                        return {
                            word: e.word,
                            matches: (e.aliases || []).map(Helpers.replaceDiacritics).concat(Helpers.replaceDiacritics(e.word))
                        };
                    });
                    u();
                });
                C.on("click", "li.ac", function(t) {
                    t.preventDefault();
                    p();
                    e(x).focus();
                });
                C.on("mousemove", "li.ac", _.throttle(function(e) {
                    var t = _.isEmpty(E) || E.x == e.clientX && E.y == e.clientY;
                    t || a(e.currentTarget);
                    E.x = e.clientX;
                    E.y = e.clientY;
                }, 30));
            });
        }
    };
}(jQuery);
