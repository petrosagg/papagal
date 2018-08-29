var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b, y, w, k, x, C, E, T, S, D, A, M, F = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, N = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (O.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, O = {}.hasOwnProperty, I = [].slice, P = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

for (Views.Shared.Tokenist = function(e) {
    function Tokenist() {
        this.stopAndAdd = F(this.stopAndAdd, this);
        this.delegateKeys = F(this.delegateKeys, this);
        this.onFocus = F(this.onFocus, this);
        this.onBlur = F(this.onBlur, this);
        this.onDelete = F(this.onDelete, this);
        this.onBackspace = F(this.onBackspace, this);
        this.onRightArrow = F(this.onRightArrow, this);
        this.onLeftArrow = F(this.onLeftArrow, this);
        this.onTextSelect = F(this.onTextSelect, this);
        this.onCaretMove = F(this.onCaretMove, this);
        this.onRangeChange = F(this.onRangeChange, this);
        return Tokenist.__super__.constructor.apply(this, arguments);
    }
    N(Tokenist, e);
    Tokenist.prototype.className = "tokenist";
    Tokenist.prototype.events = {
        "click .tokenist-token-remove": "tokenRemove",
        "focus .tokenist-token-remove": "tokenRemove",
        "click .tokenist-token": "focusClicked",
        "dblclick .token": "tokenEdit",
        focus: "onFocus"
    };
    Tokenist.prototype.initialize = function(e) {
        this.options = e != null ? e : {};
        this.autocompleter = this.options.autocompleter;
        this.tokens = this.options.tokens || [];
        return this.bindBehavior();
    };
    Tokenist.prototype.bindBehavior = function() {
        var e, t, n, i;
        this.enable();
        e = this.$el.asEventStream("focus").delay(0);
        i = this.$el.asEventStream("mouseup keyup paste").merge(this.$el.asEventStream("keydown").delay(0)).merge(e).map(function(e) {
            return function(t) {
                return e.getRange();
            };
        }(this)).skipDuplicates();
        n = this.$el.asEventStream("keydown");
        t = this.$el.asEventStream("blur").delay(50).filter(function(e) {
            return function(t) {
                return !e.focused();
            };
        }(this));
        this.editorKey = new Bacon.Bus();
        this.tokenistKey = new Bacon.Bus();
        this.listenTo(this.autocompleter, "chosen", this.stopAndAdd);
        this.autocompleter.$el.on("mousedown", function(e) {
            return function(t) {
                var n;
                e.editorNode || e.startEditor((n = e.getRange()) != null ? n.endContainer.parentNode : void 0);
                return _.defer(function() {
                    return e.$el.focus();
                });
            };
        }(this));
        return this.behavior = [ n.filter(C(f, m, p, u, l, w, a, c)).onValue(function(e) {
            return e.preventDefault();
        }), n.onValue(this.delegateKeys), this.tokenistKey.filter(C(b)).onValue(function(e) {
            return e.preventDefault();
        }), this.tokenistKey.filter(C(d)).onValue(this.onLeftArrow), this.tokenistKey.filter(C(g)).onValue(this.onRightArrow), this.tokenistKey.filter(C(r)).onValue(this.onBackspace), this.tokenistKey.filter(C(s)).onValue(this.onDelete), this.tokenistKey.filter(C(c)).onValue(function(e) {
            return function() {
                return e.$el.blur();
            };
        }(this)), n.filter(C(a)).onValue(function(e) {
            return function() {
                return e.autocompleter.selectNext();
            };
        }(this)), n.filter(C(w)).onValue(function(e) {
            return function() {
                return e.autocompleter.selectPrev();
            };
        }(this)), n.filter(C(l, y, b, o)).onValue(function(e) {
            return function(t) {
                return e.autocompleter.completionKey(t);
            };
        }(this)), t.onValue(this.onBlur), i.onValue(function(e) {
            return function(t) {
                return e.onRangeChange(t);
            };
        }(this)) ];
    };
    Tokenist.prototype.unbindBehavior = function() {
        var e, t, n, r;
        this.stopListening(this.autocompleter);
        this.autocompleter.$el.off("mousedown");
        if (this.behavior) {
            for (n = this.behavior, e = 0, t = n.length; t > e; e++) {
                (r = n[e])();
            }
        }
        return this.off();
    };
    Tokenist.prototype.setElement = function(e) {
        Tokenist.__super__.setElement.apply(this, arguments);
        if (this.autocompleter) {
            this.unbindBehavior(), this.bindBehavior()
        };
        return this;
    };
    Tokenist.prototype.render = function() {
        var e, t, n, r;
        for (this.$el.empty(), n = this.tokens, e = 0, t = n.length; t > e; e++) {
            r = n[e];
            this.$el.append(this.renderToken(r));
        }
        this.setPlaceholder();
        this.$el.append(this.renderSpace());
        this.normalizeSpaces();
        this.$el.attr({
            "data-placeholder": this.options.placeholder,
            spellcheck: !1
        });
        return this;
    };
    Tokenist.prototype.disable = function() {
        this.$el.attr("contenteditable", "false");
        return this.$el.addClass("disabled");
    };
    Tokenist.prototype.enable = function() {
        var e;
        try {
            this.el.contentEditable = "plaintext-only";
        } catch (t) {
            e = t, this.el.contentEditable = !0;
        }
        return this.$el.removeClass("disabled");
    };
    Tokenist.prototype.reset = function(e) {
        this.tokens = e;
        return this.render();
    };
    Tokenist.prototype.focus = function() {
        if (this.focused()) {
            return void 0;
        }
        this.$el.focus();
        return setTimeout(function(e) {
            return function() {
                return e.setCaretAt(e.el.lastChild.textContent.length - 1, e.el.lastChild);
            };
        }(this), 0);
    };
    Tokenist.prototype.focused = function() {
        return document.activeElement === this.el;
    };
    Tokenist.prototype.destroy = function() {
        this.unbindBehavior();
        return this.remove();
    };
    Tokenist.prototype.getRange = function() {
        var e;
        e = window.getSelection();
        if (e.rangeCount) {
            return e.getRangeAt(0);
        }
        return null;
    };
    Tokenist.prototype.setCaretAt = function(e, t, n, r) {
        var o, i;
        if (t && this.focused()) {
            t = t.firstChild || t;
            if (e < 0) {
                e = 0
            };
            o = document.createRange();
            i = window.getSelection();
            o.setStart(t, e);
            if (r) {
                r = r.firstChild || r;
                o.setEnd(r, n);
            } else o.collapse(!0);
            t = (r != null ? r.parentNode : void 0) || t.parentNode;
            if (t.parentNode != null && !t.parentNode.scrollWidth > t.parentNode.offsetWidth && typeof t.scrollIntoView == "function") {
                t.scrollIntoView()
            };
            i.removeAllRanges();
            i.addRange(o);
            if (t.offsetLeft < this.$el.scrollLeft()) {
                return this.$el[0].scrollLeft = t.offsetLeft;
            }
            if (t.offsetLeft > this.$el[0].scrollLeft + this.$el.width()) {
                return this.$el[0].scrollLeft = t.offsetLeft - this.$el.width();
            }
            return;
        }
    };
    Tokenist.prototype.resetActiveToken = function() {
        return this.$el.contents().removeClass(k.active);
    };
    Tokenist.prototype.setActiveToken = function(e) {
        this.resetActiveToken();
        if (e) {
            e = $(e);
            return e.addClass(k.active);
        }
        return;
    };
    Tokenist.prototype.getActiveToken = function() {
        return this.$el.find(A.active)[0];
    };
    Tokenist.prototype.startEditor = function(e) {
        var t, n;
        if ($(e).is(A.space)) {
            this.$el.removeClass(k.placeholder);
            this.editorNode = e;
            this.resetActiveToken();
            $(this.editorNode).addClass(k.editing);
            this.editorNode.addEventListener("DOMCharacterDataModified", function(e) {
                return function(t) {
                    var n, r;
                    r = function() {
                        var e, t, r, o;
                        for (r = this.editorNode.childNodes, o = [], e = 0, t = r.length; t > e; e++) {
                            n = r[e];
                            o.push(n.textContent);
                        }
                        return o;
                    }.call(e).join(" ");
                    if (r[0] !== S || r[r.length - 1] !== S) {
                        e.editorNode.textContent = "" + S + r.replace(S, "") + S
                    };
                    return e.autocompleter.refreshQuery(r.trim());
                };
            }(this));
            n = function() {
                var e, n, r, o;
                for (r = this.editorNode.childNodes, o = [], e = 0, n = r.length; n > e; e++) {
                    t = r[e];
                    o.push(t.textContent);
                }
                return o;
            }.call(this).join(" ").trim();
            if ("" !== n) {
                return this.autocompleter.refreshQuery(n);
            }
            return;
        }
    };
    Tokenist.prototype.stopEditor = function(e) {
        var t, n, r;
        if (e == null) {
            e = function() {}
        };
        n = this.renderSpace();
        if (this.editorNode) {
            $(this.editorNode).replaceWith(n);
            this.editorNode = void 0;
        } else {
            t = $((r = this.getRange()) != null ? r.endContainer.parentNode : void 0);
            t.is(A.space) && this.focused() || (t = this.$el.find(A.space).last().get());
            $(t).replaceWith(n);
        }
        e(n);
        this.normalizeSpaces();
        this.setPlaceholder();
        return this.setCaretAt(1, n[0]);
    };
    Tokenist.prototype.addToken = function(e, t) {
        var n, r;
        if (t == null) {
            t = null
        };
        r = this.renderToken(e);
        if (t) {
            $(t).before(r);
            this.tokens.splice(this.$(A.token).index(r.last()), 0, e);
        } else {
            this.$el.append(r);
            this.tokens.push(e);
        }
        if (typeof (n = this.options).onTokenAdd == "function") {
            n.onTokenAdd(e)
        };
        return this.trigger("token-add", e);
    };
    Tokenist.prototype.removeToken = function(e) {
        var t;
        if (e && -1 !== this.tokens.indexOf(e)) {
            this.tokens.splice(this.tokens.indexOf(e), 1);
            if (typeof (t = this.options).onTokenRemove == "function") {
                t.onTokenRemove(e)
            };
            this.trigger("token-remove", e);
            this.removeTokenElement(this.getTokenElement(e));
            return this.setPlaceholder();
        }
    };
    Tokenist.prototype.isEmpty = function() {
        if (this.tokens.length === 0) {
            if (this.editorNode) {
                return this.editorNode.textContent.length === 0;
            }
            return !0;
        }
        return !1;
    };
    Tokenist.prototype.setPlaceholder = function() {
        return this.$el.toggleClass(k.placeholder, !this.editorNode && !this.tokens.length);
    };
    Tokenist.prototype.renderSpace = function() {
        return $("<span/>").addClass(k.space).text("" + S + S);
    };
    Tokenist.prototype.renderToken = function(e) {
        var t;
        t = $("<div>").addClass(k.token).attr("contenteditable", "false").data("token", e).append($("<span/>").addClass("token").text(e), $("<span>").addClass("tokenist-token-remove fa fa-fw fa-times"));
        return $(this.renderSpace().toArray().concat(t.toArray()));
    };
    Tokenist.prototype.removeTokenElement = function(e) {
        var t, n, r, o, i;
        e = $(e);
        n = e.next();
        r = e.prev();
        t = (i = this.getRange()) != null ? i.endContainer : void 0;
        if (n.is(A.editing)) {
            if (t === r[0].firstChild) {
                this.setCaretAt(1, n[0])
            };
            r.remove();
        } else {
            if (t === n[0].firstChild) {
                this.setCaretAt(1, r[0])
            };
            n.remove();
        }
        e.remove();
        o = this.getRange();
        if (o) {
            return this.onCaretMove(o);
        }
        return;
    };
    Tokenist.prototype.getTokenElement = function(e) {
        return _.find(this.$el.find(A.token).get(), function(t) {
            if (e === $(t).data("token")) {
                return t;
            }
            return;
        });
    };
    Tokenist.prototype.normalizeSpaces = function() {
        return _.each(this.$(A.space), function(e) {
            return e.firstChild.replaceData(0, e.firstChild.length, "" + S + S);
        });
    };
    Tokenist.prototype.inputStarted = function() {
        var e, t;
        e = (t = this.getRange()) != null ? t.endContainer : void 0;
        if (e) {
            return $(e.parentNode).is(A.space) && !e.parentNode.textContent.match(/^\s{1,2}$/);
        }
        return !1;
    };
    Tokenist.prototype.tokenRemove = function(e) {
        e.stopPropagation();
        return this.removeToken($(e.target.parentNode).data("token"));
    };
    Tokenist.prototype.tokenEdit = function(e) {
        var t, n;
        if (this.options.editable && (n = $(e.target.parentNode).data("token"))) {
            this.autocompleter.chooseQuery();
            this.stopEditor();
            t = $(e.target.parentNode).prev().text(S + n + S);
            this.removeToken(n);
            this.startEditor(t[0]);
            return this.setCaretAt(n.length + 1, this.editorNode);
        }
        return;
    };
    Tokenist.prototype.onRangeChange = function(e) {
        var t;
        if (t = e != null ? e.endContainer : void 0) {
            if (e.startContainer !== t || e.startOffset !== e.endOffset) {
                return this.onTextSelect(e);
            }
            return this.onCaretMove(e);
        }
        return;
    };
    Tokenist.prototype.onCaretMove = function(e) {
        var t, n, r, o;
        o = e.endContainer;
        n = o.parentNode;
        t = $(n);
        if (this.editorNode) {
            if (this.editorNode !== n) {
                this.setCaretAt(this.editorNode.textContent.length - 1, this.editorNode);
            } else if (e.startOffset === 0) {
                this.setCaretAt(1, this.editorNode);
            } else if (e.endOffset === o.textContent.length) {
                this.setCaretAt(n.textContent.length - 1, this.editorNode)
            };
            if (!this.inputStarted()) {
                return this.stopEditor();
            }
        } else if (t.is(A.space)) {
            if (this.inputStarted()) {
                return this.startEditor(n);
            }
            if (1 !== e.endOffset) {
                return this.setCaretAt(1, o);
            }
        } else if (r = t.closest(A.token).next()[0] || this.$(A.space).last()[0]) {
            return this.setCaretAt(1, r);
        }
    };
    Tokenist.prototype.onTextSelect = function(e) {
        var t, n, r, o, i, s, a;
        if (this.editorNode) {
            a = e.startContainer;
            n = e.endContainer;
            r = this.editorNode.textContent.length - 1;
            i = a.parentElement === this.editorNode ? e.startOffset || 1 : 1;
            o = n.parentElement === this.editorNode ? Math.min(e.endOffset, r) || 1 : r;
            t = i === e.startOffset && o === e.endOffset && a.parentElement === (s = n.parentElement) && s === this.editorNode;
            if (t) {
                return void 0;
            }
            return this.setCaretAt(i, this.editorNode, o, this.editorNode);
        }
        this.setCaretAt(1, e.endContainer);
        return void this.onCaretMove(e);
    };
    Tokenist.prototype.onLeftArrow = function(e) {
        var t;
        e.preventDefault();
        if (t = this.getRange().endContainer.parentNode.previousSibling) {
            this.resetActiveToken();
            return this.setCaretAt(1, t.previousSibling);
        }
        return;
    };
    Tokenist.prototype.onRightArrow = function(e) {
        var t, n;
        e.preventDefault();
        t = this.getRange().endContainer.parentNode;
        if (n = t.nextSibling) {
            return this.setCaretAt(1, n.nextSibling);
        }
        return;
    };
    Tokenist.prototype.onBackspace = function(e) {
        var t;
        t = $(this.getRange().endContainer.parentNode);
        if (t.is(A.editing)) {
            return void 0;
        }
        e.preventDefault();
        return this.removeToken(t.prev().data("token"));
    };
    Tokenist.prototype.onDelete = function(e) {
        var t;
        t = $(this.getRange().endContainer.parentNode);
        if (t.is(A.editing)) {
            return void 0;
        }
        e.preventDefault();
        return this.removeToken(t.next().data("token"));
    };
    Tokenist.prototype.onBlur = function(e) {
        this.$el.removeClass("focused");
        this.setPlaceholder();
        return this.trigger("tokenist-blur", e);
    };
    Tokenist.prototype.onFocus = function(e) {
        this.$el.addClass("focused");
        return this.trigger("tokenist-focus", e);
    };
    Tokenist.prototype.focusClicked = function(e) {
        var t, n, r;
        this.focused() || this.$el.focus();
        r = (t = e.currentTarget) != null && (n = t.nextSibling) != null ? n.firstChild : void 0;
        if (r) {
            return this.setCaretAt(1, r);
        }
        return;
    };
    Tokenist.prototype.delegateKeys = function(e) {
        var t, n, r;
        t = $((n = this.getRange()) != null && (r = n.endContainer) != null ? r.parentNode : void 0);
        if (t.is(A.editing)) {
            return this.editorKey.push(e);
        }
        if (t.is(A.space)) {
            return this.tokenistKey.push(e);
        }
        return;
    };
    Tokenist.prototype.stopAndAdd = function(e) {
        _.isArray(e) || (e = [ e ]);
        return this.stopEditor(function(t) {
            return function(n) {
                var r, o, i, s;
                for (i = [], r = 0, o = e.length; o > r; r++) {
                    s = e[r];
                    i.push(t.addToken(s, n));
                }
                return i;
            };
        }(this));
    };
    return Tokenist;
}(Backbone.View), b = 32, l = 13, r = 8, y = 9, s = 46, d = 37, w = 38, g = 39, 
a = 40, f = 33, m = 34, p = 35, u = 36, c = 27, v = 186, o = 188, h = 8194, i = [ d, w, g, a ], 
S = String.fromCharCode(h), M = "tokenist", k = {}, A = {}, D = [ "space", "token", "editing", "active", "placeholder" ], 
x = 0, T = D.length; T > x; x++) {
    E = D[x];
    k[E] = M + "-" + E;
    A[E] = "." + k[E];
}

C = function() {
    var e;
    e = arguments.length >= 1 ? I.call(arguments, 0) : [];
    return function(t) {
        var n;
        n = t.which;
        return P.call(e, n) >= 0;
    };
};
