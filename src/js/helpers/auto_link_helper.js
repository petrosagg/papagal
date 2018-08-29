var r, o, i;

_.extend(Helpers, {
    autoLink: function(e, t) {
        return Helpers.autoLinkEmails(Helpers.autoLinkUrls(Helpers.autoLinkMentions(Helpers.autoLinkHashtags(e, t), t)), t);
    },
    autoLinkEmails: function(e, t) {
        var n, i, s;
        n = $("<div>").html(e)[0];
        s = function(e) {
            return $("<a>").attr({
                href: "mailto:" + e
            }).text(e).addClass(t.emailClass || "")[0];
        };
        i = r(FlowdockText.extractEmailsWithIndices, s, "email");
        return o(n, i).innerHTML;
    },
    autoLinkUrls: function(e, t) {
        var n, i, s;
        if (t == null) {
            t = {}
        };
        n = $("<div>").html(e)[0];
        s = function(e) {
            var t;
            t = /^https?:\/\//.test(e) ? "" : "http://";
            return $("<a>").attr("href", "" + t + e).text(e).addClass("external embeddable")[0];
        };
        i = r(FlowdockText.extractUrlsWithIndices, s, "url");
        return o(n, i, i).innerHTML;
    },
    autoLinkMentions: function(e, t) {
        var n, r, s, a, u;
        if (t == null) {
            t = {}
        };
        n = $("<div>").html(e)[0];
        u = (t.users || []).map(function(e) {
            return "@" + e.nick;
        });
        r = function(e) {
            return FlowdockText.extractMentionsWithIndices(e, u.concat(t.everyoneTags));
        };
        a = function(e) {
            var n;
            if (_.contains(t.everyoneTags, e.toLowerCase())) {
                return $("<a>").attr({
                    href: "" + t.hashtagUrlBase + e,
                    "data-tag-search": e
                }).text(e).addClass(t.hashtagClass)[0];
            }
            n = _.find(t.users, function(t) {
                return t.nick.toLowerCase() === e.slice(1).toLowerCase();
            });
            return $("<a>").attr({
                "data-user": n != null ? n.id : undefined
            }).text("" + e).addClass(t.mentionClass)[0];
        };
        s = i(r, a);
        return o(n, s).innerHTML;
    },
    autoLinkHashtags: function(e, t) {
        var n, r, s;
        if (t == null) {
            t = {}
        };
        n = $("<div>").html(e)[0];
        s = function(e) {
            return $("<a>").attr({
                href: "" + t.hashtagUrlBase + e,
                title: "#" + e,
                "data-tag-search": e
            }).text("#" + e).addClass(t.hashtagClass)[0];
        };
        r = i(FlowdockText.extractHashtagsWithIndices, s);
        return o(n, r).innerHTML;
    }
});

r = function(e, t, n) {
    return function(r) {
        var o, i, s, a, u, l, c;
        for (c = r.textContent || r.data, o = e(c), u = o.reverse(), l = [], s = 0, a = u.length; a > s; s++) {
            i = u[s];
            l.push(function(e) {
                var o, i;
                i = r.splitText(e.indices[0]);
                i.splitText(e[n].length);
                o = t(e[n]);
                return r.parentNode.replaceChild(o, i);
            }(i));
        }
        return l;
    };
};

i = function(e, t) {
    return function(n) {
        var r, o, i, s, a, u, l;
        for (l = n.textContent || n.data, u = e(l), s = u.reverse(), a = [], o = 0, i = s.length; i > o; o++) {
            r = s[o];
            a.push(function(e) {
                var r, o;
                r = n.splitText(e.indices[0]);
                r.splitText(e.indices[1] - e.indices[0]);
                o = t(e.tag);
                return n.parentNode.replaceChild(o, r);
            }(r));
        }
        return a;
    };
};

o = function(e, t, n) {
    var r, i, s;
    for (n == null && (n = function(e, t) {
        return e;
    }), i = 0; i < e.childNodes.length; ) {
        r = e.childNodes[i];
        if (r.nodeType === 3) {
            t(r);
        } else {
            if (r.hasChildNodes() && "A" !== (s = r.nodeName)) {
                r.nodeName === "PRE" ? o(r, n, n) : o(r, t, n)
            };
        }
        i++;
    }
    return e;
};
