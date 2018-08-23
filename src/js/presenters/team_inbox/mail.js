var r, o, i, s = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, a = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (u.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, u = {}.hasOwnProperty;

Presenters.TeamInbox.Mail = function(e) {
    function Mail(e, t, n) {
        this.event = e;
        this.content = t;
        this.data = n;
        this.actions = s(this.actions, this);
    }
    a(Mail, e);
    Mail.prototype.icon = function() {
        return Flowdock.icons.mail;
    };
    Mail.prototype.author = function() {
        var e, t, n, r, o;
        e = (t = this.content.from) != null && (n = t[0]) != null ? n.address : void 0;
        return {
            name: ((r = this.content.from) != null && (o = r[0]) != null ? o.name : void 0) || (e != null ? e.split("@")[0] : void 0),
            link: "mailto:" + e,
            email: e
        };
    };
    Mail.prototype.headline = function() {
        return this.content.subject;
    };
    Mail.prototype.summary = function() {
        return this.content.subject;
    };
    Mail.prototype.body = function() {
        var e;
        e = i(this.content.content);
        if (e && 0 !== e.length) {
            e = Presenters.Helper.restifyFilepaths(e);
            e = Presenters.Helper.autoLink(e, this.data);
            return Presenters.Helper.render("mail", {
                headers: o(this.content),
                body: {
                    html: e
                }
            });
        }
        return;
    };
    Mail.prototype.meta = function() {
        var e;
        e = [];
        if (this.content.source) {
            e.push({
                text: this.content.source
            })
        };
        if (this.content.project) {
            e.push({
                text: this.content.project
            })
        };
        return e;
    };
    Mail.prototype.action = function() {};
    Mail.prototype.actions = function() {
        var e, t;
        return [ {
            text: "reply",
            link: Helpers.MailHelper.mailtoUrl(this.content, "reply", (e = this.data) != null ? e.sent : void 0),
            className: "mail-reply"
        }, {
            text: "forward",
            link: Helpers.MailHelper.mailtoUrl(this.content, "forward", (t = this.data) != null ? t.sent : void 0),
            className: "mail-forward"
        } ];
    };
    Mail.prototype.excerpt = function() {
        var e;
        e = Presenters.Helper.unsafeStripHTML(i(this.content.content));
        return Presenters.Helper.sliceExcerpt(e);
    };
    Mail.prototype.linkTitle = function() {
        if (this.content.source) {
            return "Open in " + this.content.source;
        }
        return "Open original";
    };
    Mail.prototype.link = function() {
        return this.content.link;
    };
    return Mail;
}(Presenters.InboxMessage);

i = function(e) {
    if (_.isArray(e)) {
        e = e.filter(function(e) {
            return _.isString(e) && e.length > 0;
        }).join()
    };
    return e;
};

o = function(e) {
    var t, n, o, i;
    n = _.object(function() {
        var n, o, i, s;
        for (i = [ "from", "to", "cc", "bcc", "replyTo" ], s = [], n = 0, o = i.length; o > n; n++) {
            t = i[n];
            if (e[t]) {
                s.push([ t, _.compact(_.map(e[t], r)) ])
            };
        }
        return s;
    }());
    if (((o = n.replyTo) != null ? o[0] : void 0) != null && ((i = n.from) != null ? i[0] : void 0) != null && n.replyTo[0].address === n.from[0].address) {
        delete n.replyTo
    };
    return n;
};

r = function(e) {
    if (e) {
        e = _.extend({}, e);
        e.name && "" !== e.name ? e.name = e.name + " <" + e.address + ">" : e.name = e.address;
        return e;
    }
    return;
};
