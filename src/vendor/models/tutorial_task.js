var r, o, i, s, a, u, l, c, p, d = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (h.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, h = {}.hasOwnProperty;

p = function() {
    function e(e) {
        this.id = e.id;
        this.name = e.name;
        this.tutorial = e.tutorial;
    }
    e.build = function(e) {
        switch (e.name) {
          case "invitee-chat":
            return new s(e);

          case "invitee-invite":
            return new u(e);

          case "invitee-menu":
            return new l(e);

          case "invitee-inbox":
            return new a(e);

          case "chat":
            return new r(e);

          case "invite":
            return new i(e);

          case "menu":
            return new c(e);

          case "inbox":
            return new o(e);

          default:
            return console.error("No matching tutorial task found for " + e.name);
        }
    };
    e.isFinished = function(e) {
        return !(!e.skipped_at && !e.completed_at);
    };
    e.prototype.url = function() {
        return "/owl/tutorials/" + this.tutorial + "/tasks/" + this.id;
    };
    e.prototype.complete = function() {
        var e;
        e = Flowdock.ANALYTICS_EVENT_TYPES.onboarding_step_complete_ + this.name;
        Flowdock.analytics.track(e);
        return this._postData({
            completed: !0
        });
    };
    e.prototype.skip = function() {
        var e;
        e = Flowdock.ANALYTICS_EVENT_TYPES.onboarding_step_skip_ + this.name;
        Flowdock.analytics.track(e);
        return this._postData({
            skipped: !0
        });
    };
    e.prototype._postData = function(e) {
        e = _.extend({
            _method: "PUT"
        }, e);
        return $.post(this.url(), e);
    };
    return e;
}();

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.name = "chat";
    t.prototype.steps = [ {
        title: "Send your first message",
        description: "Every flow has a chat. Share your thoughts, ask questions and express emotions."
    } ];
    t.prototype.successStep = {
        title: "Just like that!",
        description: "Chat is the heart of CA Flowdock, but there's more…"
    };
    return t;
}(p);

i = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.name = "invite";
    t.prototype.steps = [ {
        title: "Invite your team",
        description: "Get some real people in your flow to start communicating in CA Flowdock."
    } ];
    t.prototype.successStep = {
        title: "Nicely done!",
        description: "While we wait for them to join, let's continue the tour…"
    };
    return t;
}(p);

c = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.name = "menu";
    t.prototype.steps = [ {
        title: "Your CA Flowdock preferences",
        description: "Change the way CA Flowdock works. Tweak your notification settings."
    }, {
        title: "Change a few settings",
        description: "Make CA Flowdock your own. Help others recognize you by uploading an avatar."
    } ];
    t.prototype.successStep = {
        title: "Nicely done!",
        description: "Now you know where to find your preferences."
    };
    return t;
}(p);

o = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.name = "inbox";
    t.prototype.steps = [ {
        title: "Each flow has a team inbox",
        description: "The team inbox is a window into your team's work. Stay up-to-date with all your tools, from wikis to version control. Comment on any activity."
    } ];
    t.prototype.successStep = {
        title: "This is the team inbox!",
        description: "Next up, have a look at what you can do with it."
    };
    return t;
}(p);

s = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.steps = [ {
        title: "Send your first message",
        description: "Join the conversation. Reply to a message by clicking on the bubble to its left."
    } ];
    t.prototype.successStep = {
        title: "Just like that!",
        description: "Chat is the heart of CA Flowdock, but there's more…"
    };
    return t;
}(o);

u = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.steps = [ {
        title: "Invite the right people",
        description: "Who do you work with? Are they already here? If not, invite them."
    } ];
    t.prototype.successStep = {
        title: "Nicely done!",
        description: "While we wait for them to join, let's continue the tour…"
    };
    return t;
}(o);

l = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.steps = [ {
        title: "Your CA Flowdock preferences",
        description: "Change the way CA Flowdock works. Tweak your notification settings."
    }, {
        title: "Change a few settings",
        description: "Make CA Flowdock your own. Help others recognize you by uploading an avatar."
    } ];
    t.prototype.successStep = {
        title: "Nicely done!",
        description: "Now you know where to find your preferences."
    };
    return t;
}(o);

a = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    d(t, e);
    t.prototype.steps = [ {
        title: "Each flow has a team inbox",
        description: "The team inbox is a window into your team's work. Stay up-to-date with all your tools, from wikis to version control. Comment on any activity."
    } ];
    t.prototype.successStep = {
        title: "This is the team inbox!",
        description: "Next up, have a look at what you can do with it."
    };
    return t;
}(o);

module.exports = p;
