var r, o;

o = require("models/tutorial_task");

r = function() {
    function e(e, t) {
        if (t == null) {
            t = {}
        };
        this.id = e.id;
        this.tasks = e.tasks.filter(function(e) {
            return !o.isFinished(e);
        }).map(function(e) {
            return o.build(e);
        }).filter(function(e) {
            return e;
        }).map(function(t) {
            t.tutorial = e.id;
            return t;
        });
    }
    e.urlRoot = "/owl/tutorials/";
    e.create = function(t) {
        var n;
        n = new $.Deferred();
        $.post(e.urlRoot, t).done(function(t) {
            var r;
            r = new e(t);
            return n.resolve(r);
        });
        return n;
    };
    e.prototype.url = function() {
        return e.urlRoot + this.id;
    };
    e.prototype.getState = function() {
        return this.get("tasks").filter(function(e) {
            return !(e.completed_at != null || e.skipped_at != null);
        }).map(function(e) {
            return e.name;
        });
    };
    e.prototype.getTaskMatching = function(e) {
        return _.find(this.tasks, function(t) {
            return Helpers.endsWith(t.name, e);
        });
    };
    e.prototype.complete = function() {
        return this._postTutorialData({
            completed: true
        });
    };
    e.prototype.skip = function() {
        return this._postTutorialData({
            skipped: true
        });
    };
    e.prototype._postData = function(e, t) {
        t = _.extend({
            _method: "PUT"
        }, t);
        return $.post(e, t);
    };
    e.prototype._postTutorialData = function(e) {
        return this._postData(this.url(), e);
    };
    return e;
}();

module.exports = r;
