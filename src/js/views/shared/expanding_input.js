var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

Views.Shared.ExpandingInput = function(t) {
    function ExpandingInput() {
        this.setCaretAtEnd = r(this.setCaretAtEnd, this);
        this.setMaxHeight = r(this.setMaxHeight, this);
        return ExpandingInput.__super__.constructor.apply(this, arguments);
    }
    o(ExpandingInput, t);
    ExpandingInput.prototype.template = require("../../templates/shared/expanding_input.mustache");
    ExpandingInput.prototype.className = "expanding-input";
    ExpandingInput.prototype.events = {
        "input textarea": "mirrorText",
        "focus textarea": "bubbleEvent",
        "blur textarea": "bubbleEvent",
        "keydown textarea": "bubbleEvent"
    };
    ExpandingInput.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.autofocus = e.autofocus || false;
        this.placeholder = e.placeholder || "";
        this.persistId = e.persistId;
        this.maxlength = e.maxlength || 8e3;
        return $(window).asEventStream("unload").merge(this.asEventStream("destructor")).take(1).onValue(function(e) {
            return function() {
                if (e.textarea != null) {
                    return e.saveText();
                }
                return;
            };
        }(this));
    };
    ExpandingInput.prototype.focus = function() {
        var e;
        if ((e = this.textarea) != null) {
            return e.focus();
        }
        return;
    };
    ExpandingInput.prototype.focused = function() {
        var e;
        if ((e = this.textarea) != null) {
            return e.is(":focus");
        }
        return;
    };
    ExpandingInput.prototype.mirrorText = function() {
        var e, t;
        this.truncate();
        this.trigger("input");
        e = this.$el.height();
        t = this.textarea.val();
        this.span.text(t);
        if (this.$el.height() !== e) {
            return this.trigger("scale");
        }
        return;
    };
    ExpandingInput.prototype.serializeData = function() {
        return {
            maxlength: this.maxlength,
            persistId: this.persistId,
            placeholder: this.placeholder
        };
    };
    ExpandingInput.prototype.onAfterRender = function() {
        this._restoreText();
        this.textarea = this.$("textarea").indentPaste();
        this.span = this.$("span.copy");
        this.mirrorText();
        if (this.autofocus && !Flowdock.mobile) {
            _.defer(function(e) {
                return function() {
                    return e.focus();
                };
            }(this))
        };
        return this;
    };
    ExpandingInput.prototype.reset = function() {
        this.textarea.val("");
        this.textarea.trigger("reset");
        return this.mirrorText();
    };
    ExpandingInput.prototype.setMaxHeight = function() {
        this.$el.css("max-height", .4 * $(window).height() + "px");
        return this.trigger("scale");
    };
    ExpandingInput.prototype.setPlaceholder = function(e) {
        var t;
        if ((t = this.textarea) != null) {
            return t.attr("placeholder", e);
        }
        return;
    };
    ExpandingInput.prototype.saveText = function() {
        var e;
        e = this.value();
        if (this.persistId != null) {
            if (e) {
                return localStorage.setItem(this.persistId, e);
            }
            return localStorage.removeItem(this.persistId);
        }
        return;
    };
    ExpandingInput.prototype.setText = function(e) {
        this.textarea.val(e);
        return this.mirrorText();
    };
    ExpandingInput.prototype.appendText = function(e) {
        var t, n, r, o, i;
        o = this.textarea.prop("selectionStart");
        r = this.textarea.prop("selectionEnd");
        i = this.textarea.val();
        if (i.length && !i.match(/\s$/)) {
            e = " " + e
        };
        if (!e.match(/\s$/)) {
            e += " "
        };
        n = i.substring(0, o);
        t = i.substring(r, i.length);
        this.textarea.val(n + e + t);
        this.textarea[0].selectionStart = this.textarea[0].selectionEnd = o + e.length;
        this.textarea.focus();
        return this.mirrorText();
    };
    ExpandingInput.prototype.value = function() {
        var e;
        if ((e = this.textarea) != null) {
            return e.val();
        }
        return;
    };
    ExpandingInput.prototype.truncate = function() {
        if (this.textarea && this.textarea.val().length > this.maxlength) {
            return this.textarea.val(this.textarea.val().slice(0, this.maxlength));
        }
        return;
    };
    ExpandingInput.prototype._restoreText = function() {
        var e;
        if (this.persistId != null) {
            e = localStorage.getItem(this.persistId);
            if (e != null) {
                return this.$("textarea").val(e).one("focus", this.setCaretAtEnd);
            }
            return;
        }
    };
    ExpandingInput.prototype.setCaretAtEnd = function(e) {
        var t, n;
        t = this.$("textarea");
        if (t) {
            n = t.val();
            return t.focus().val("").val(n);
        }
        return;
    };
    ExpandingInput.prototype.getInput = function() {
        return this.textarea;
    };
    ExpandingInput.prototype.bubbleEvent = function(e) {
        return this.trigger(e.type, e);
    };
    ExpandingInput.prototype.destructor = function() {
        var e;
        ExpandingInput.__super__.destructor.apply(this, arguments);
        if ((e = this.picker) != null) {
            e.close()
        };
        return this.textarea = this.span = this.picker = undefined;
    };
    return ExpandingInput;
}(Flowdock.ItemView);
