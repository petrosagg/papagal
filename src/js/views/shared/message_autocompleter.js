var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Views.MessageAutocompleter = function(e) {
    function MessageAutocompleter() {
        return MessageAutocompleter.__super__.constructor.apply(this, arguments);
    }
    r(MessageAutocompleter, e);
    MessageAutocompleter.prototype.initialize = function(e) {
        MessageAutocompleter.__super__.initialize.apply(this, arguments);
        this.collection = this.model.flow().tags;
        return this.listenTo(this.model, "change:tags", this.render);
    };
    MessageAutocompleter.prototype.completionKey = function(e) {
        var t, n;
        e.preventDefault();
        if ((t = e.which) === 32 || t === 188) {
            return this.chooseQuery();
        }
        if ((n = e.which) === 9 || n === 13) {
            return this.choose();
        }
        return;
    };
    MessageAutocompleter.prototype.filterModels = function() {
        return MessageAutocompleter.__super__.filterModels.call(this).filter(function(e) {
            return !e.isAtMention();
        });
    };
    MessageAutocompleter.prototype.excludeTokens = function() {
        return this.model.get("tags");
    };
    return MessageAutocompleter;
}(Views.Shared.Autocompleter);
