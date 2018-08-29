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

Views.Thread.Discussion = function(e) {
    function Discussion() {
        return Discussion.__super__.constructor.apply(this, arguments);
    }
    r(Discussion, e);
    Discussion.prototype.className = "thread-discussion-message";
    Discussion.prototype.hasAttachments = function() {
        var e;
        return ((e = this.model.get("attachments")) != null ? e.length : undefined) > 0;
    };
    return Discussion;
}(Views.Thread.Comment);
