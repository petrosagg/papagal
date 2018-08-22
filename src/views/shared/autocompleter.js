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
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Shared.Autocompleter = function(t) {
    function Autocompleter() {
        this.addableToken = r(this.addableToken, this);
        this.render = r(this.render, this);
        return Autocompleter.__super__.constructor.apply(this, arguments);
    }
    o(Autocompleter, t);
    Autocompleter.prototype.tagName = "ul";
    Autocompleter.prototype.className = "autocompleter";
    Autocompleter.prototype.events = {
        "click .autocomplete-option": "chooseTarget",
        "mouseenter .autocomplete-option": "selectTarget"
    };
    Autocompleter.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.maxOptions = e.maxOptions || 10;
        this.query = "";
        this.defaultOptions = e.defaultOptions || [];
        return this.filters = e.filters;
    };
    Autocompleter.prototype.refreshQuery = function(e) {
        if (e == null) {
            e = ""
        };
        this.query = e.trim();
        return this.render();
    };
    Autocompleter.prototype.refresh = function() {
        var e;
        e = this.$el.hasClass("hidden");
        this.render();
        if (e) {
            return this.hide();
        }
        return this.show();
    };
    Autocompleter.prototype.render = function() {
        var e, t;
        this.empty();
        t = this.filterModels();
        this.$el.append(function() {
            var n, r, o;
            for (o = [], n = 0, r = t.length; r > n; n++) {
                e = t[n];
                o.push(this.renderOption(e));
            }
            return o;
        }.call(this));
        this.$el.children().length ? (this.show(), this.query.length && this.select(this.$el.children().first())) : (this.select(null), 
        this.hide());
        return this;
    };
    Autocompleter.prototype.destructor = function() {
        Autocompleter.__super__.destructor.apply(this, arguments);
        return this.filters = this.selection = null;
    };
    Autocompleter.prototype.select = function(e) {
        var t;
        t = e === null || $(e).is("li") ? e : $(e).parent()[0];
        this.$("li").removeClass("selected");
        return this.selection = $(t).addClass("selected");
    };
    Autocompleter.prototype.selectNext = function() {
        if (this.selection == null) {
            return void this.select(this.$el.children().first());
        }
        if (this.selection.next().length) {
            return this.select(this.selection.next());
        }
        return this.select(this.$("li").first());
    };
    Autocompleter.prototype.selectPrev = function() {
        if (this.selection == null) {
            return void this.select(this.$el.children().last());
        }
        if (this.selection.prev().length) {
            return this.select(this.selection.prev());
        }
        return this.select(this.$("li").last());
    };
    Autocompleter.prototype.completionKey = function(e) {
        return e.preventDefault();
    };
    Autocompleter.prototype.choose = function() {
        return this.chooseSelection() || this.chooseQuery();
    };
    Autocompleter.prototype.chooseSelection = function() {
        var e;
        if ((e = this.selection) != null && e.length) {
            this.trigger("chosen", this.selection.data("token")), this.refreshQuery(""), this.clearSelection()
        };
        this.hide();
    };
    Autocompleter.prototype.clearSelection = function() {
        this.$(".seleced").removeClass("selected");
        return this.selection = null;
    };
    Autocompleter.prototype.chooseQuery = function() {
        var e;
        if (this.validToken() && this.addableToken(this.query)) {
            e = Models.Tag.stripHashes(this.query);
            this.trigger("chosen", this.collection.getOrAdd(e, 0));
            return this.refreshQuery("");
        }
        return;
    };
    Autocompleter.prototype.onTab = function(e) {
        e.preventDefault();
        return this.chooseSelection();
    };
    Autocompleter.prototype.onSpacebar = function(e) {
        e.preventDefault();
        return this.chooseQuery();
    };
    Autocompleter.prototype.onReturn = function(e) {
        e.preventDefault();
        return this.choose();
    };
    Autocompleter.prototype.empty = function() {
        return this.$el.empty();
    };
    Autocompleter.prototype.show = function() {
        if (this.$el.is(".hidden")) {
            return this.$el.removeClass("hidden");
        }
        return;
    };
    Autocompleter.prototype.hide = function() {
        if (this.$el.not(".hidden")) {
            return this.$el.addClass("hidden");
        }
        return;
    };
    Autocompleter.prototype.toggle = function() {
        if (this.$el.is(".hidden")) {
            return this.show();
        }
        return this.hide();
    };
    Autocompleter.prototype.addableToken = function(e) {
        return s.call(this.excludeTokens(), e) < 0;
    };
    Autocompleter.prototype.excludeTokens = function() {
        return [];
    };
    Autocompleter.prototype.validToken = function() {
        return FlowdockText.regexen.singleValidHashTag.test(this.hashTagBody());
    };
    Autocompleter.prototype.hashTagBody = function() {
        return this.query.replace(/^#+/, "");
    };
    Autocompleter.prototype.filterModels = function(e) {
        var t, n, r, o;
        if (e == null) {
            e = !0
        };
        o = this.query;
        n = this.excludeTokens();
        t = e ? this.query.length ? this.defaultOptions.filter(function(e) {
            return e.toString().toLowerCase().indexOf(o) === 0;
        }) : this.defaultOptions : [];
        r = this.collection.startingWith(o).slice(0, this.maxOptions + n.length).filter(function(e) {
            var t;
            if (e.id.indexOf(":") === 0 || e.get("count")) {
                t = e.id;
                return s.call(n, t) < 0;
            }
            return !1;
        });
        return t.concat(r).slice(0, this.maxOptions);
    };
    Autocompleter.prototype.renderOption = function(t) {
        var n;
        n = $("<li>").addClass("autocomplete-option " + t.type() + "-choice").data("token", t);
        return n.html(Helpers.renderTemplate(require("../../templates/inbox/autocompleter_option.mustache"))({
            tag: t.toString(),
            count: typeof t.get == "function" ? t.get("count") : void 0,
            icon: _.result(t, "icon"),
            iconUrl: t.iconUrl
        }));
    };
    Autocompleter.prototype.chooseTarget = function(e) {
        e.preventDefault();
        this.select($(e.target).closest(".autocomplete-option"));
        return this.choose();
    };
    Autocompleter.prototype.selectTarget = function(e) {
        return this.select(e.target);
    };
    Autocompleter.prototype.isEmpty = function() {
        return this.$el.children().length === 0;
    };
    return Autocompleter;
}(Flowdock.HierarchicalView);