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

Models.MultiFlow = function(e) {
    function MultiFlow(e, n) {
        console.log('MultiFlow: constructor:', e, n)
        this.collection = e
        this.collection.uniqueName = () => 'omniflow'
        MultiFlow.__super__.constructor.apply(this, arguments);
    }
    o(MultiFlow, e);
    MultiFlow.prototype.isFlow = function() {
        return true;
    };
    MultiFlow.prototype.isPrivate = function() {
        return false;
    };
    MultiFlow.prototype.url = function() {
        return 'rulemotion/omniflow'
    };
    MultiFlow.prototype.email = function() {
        return 'foobar'
    };
    MultiFlow.prototype.initialize = function(e, t) {
        console.log('multiflow: initialize:', e, t)
        if (t == null) {
            t = {}
        };
        this.stream = new Bacon.Bus();
    };
    MultiFlow.prototype.getUserById = function(e) {
        console.log('multiflow: getUserById:', e)
    };
    MultiFlow.prototype.me = function() {
        return this.users.get(Flowdock.app.user.id);
    };
    MultiFlow.prototype.path = function() {
        return 'rulemotion/multi/omniflow2'
    };
    MultiFlow.prototype.fullName = function() {
        return 'foobar'
    };
    MultiFlow.prototype.organization = function() {
        return 'foobar'
    };
    MultiFlow.prototype.consume = function(e) {
        console.log('MultiFlow: consume:', e)
        return this;
    };
    MultiFlow.prototype.subscribe = function(e) {
        console.log('MultiFlow: subscribe:', e)
    };
    MultiFlow.prototype.unsubscribe = function(e) {
        console.log('MultiFlow: unsubscribe:', e)
    };
    MultiFlow.prototype.buildMessage = function(e, t) {
        console.log('MultiFlow: buildMessage:', e, t)
    };
    MultiFlow.prototype.cleanup = function() {
        console.log('MultiFlow: cleanup:')
    };
    MultiFlow.prototype.reset = function() {
        console.log('MultiFlow: reset:')
    };
    MultiFlow.prototype.set = function(e, n) {
        console.log('MultiFlow: set:', e, n)
    };
    MultiFlow.prototype.eventStreamFilter = function(e) {
        return e.MultiFlow === this.id;
    };
    MultiFlow.prototype.typingUsers = function(e) {
        return []
    };
    MultiFlow.prototype.enableJoinUrl = function() {
        console.log('MultiFlow: enableJoinUrl:')
    };
    MultiFlow.prototype.disableJoinUrl = function() {
        console.log('MultiFlow: disableJoinUrl:')
    };
    MultiFlow.prototype.combinedAccessMode = function() {
        console.log('MultiFlow: combinedAccessMode:')
    };
    MultiFlow.prototype.resetToken = function() {
        console.log('MultiFlow: resetToken:')
    };
    MultiFlow.prototype.renameUrl = function() {
        console.log('MultiFlow: renameUrl:')
    };
    MultiFlow.prototype.rename = function(e, t) {
        console.log('MultiFlow: rename:', e, t)
    };
    MultiFlow.prototype.emojiKeys = function() {
        console.log('MultiFlow: emojiKeys:')
    };
    MultiFlow.prototype.initials = function() {
        console.log('MultiFlow: initials')
    };
    MultiFlow.prototype.receivesTeamNotifications = function() {
        return false
    };
    return MultiFlow;
}(Backbone.Model);
