var r;

r = function(e) {
    return _.extend(e, {
        user: Flowdock.app.user.id
    });
};

Flowdock.socketIoSync = function(e, t, n) {
    if (e === "create") {
        return Flowdock.app.connection.sendStream.push(r(t.toJSON()));
    }
    if (e === "tag-change") {
        return Flowdock.app.connection.sendStream.push(r(_.extend(t.flowKey(), {
            event: "tag-change",
            content: _.extend({
                message: t.get("id")
            }, n.tagChanges)
        })));
    }
    if (e === "emoji-reaction") {
        return Flowdock.app.connection.sendStream.push(r(_.extend(t.flowKey(), {
            event: "emoji-reaction",
            content: _.extend({
                message: t.get("id")
            }, n.emojiReaction)
        })));
    }
    return Backbone.sync(e, t, n);
};
