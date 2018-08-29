var r, o;

o = require("MD5");

Presenters.Helper = function() {
    function Helper() {}
    Helper.templates = {
        body: require("./templates/body.mustache"),
        bodyWithProperties: require("./templates/bodyWithProperties.mustache"),
        confluence: require("./templates/confluence.mustache"),
        "github/commit": require("./templates/github/commit.mustache"),
        "github/commit_summary": require("./templates/github/commit_summary.mustache"),
        "github/commits": require("./templates/github/commits.mustache"),
        "github/pages": require("./templates/github/pages.mustache"),
        jira: require("./templates/jira.mustache"),
        mail: require("./templates/mail.mustache"),
        "shared/changeLog": require("./templates/shared/changeLog.mustache"),
        "shared/emailLink": require("./templates/shared/emailLink.mustache"),
        "shared/file_details": require("./templates/shared/file_details.mustache"),
        "shared/file_info": require("./templates/shared/file_info.mustache"),
        "shared/propertyList": require("./templates/shared/propertyList.mustache"),
        "shared/thumbnail": require("./templates/shared/thumbnail.mustache"),
        thread_group: require("./templates/thread_group.mustache"),
        "twitter/actionAuthor": require("./templates/twitter/actionAuthor.mustache"),
        "twitter/author": require("./templates/twitter/author.mustache")
    };
    Helper.avatarFromEmail = function(e, t) {
        if (t == null) {
            t = 100
        };
        if (e != null) {
            return r(o(e.toLowerCase()), t);
        }
        return;
    };
    Helper.avatarFromHash = function(e, t) {
        if (t == null) {
            t = 100
        };
        if (e != null) {
            return r(e, t);
        }
        return;
    };
    Helper.render = function(e, t, n) {
        var r, o, i, s, a;
        if (n == null) {
            n = {}
        };
        i = {};
        for (o in t) {
            r = t[o];
            if (r) {
                i[o] = r.html != null ? r.html : r.text != null ? this.escape(r.text).replace(/\n/g, "<br/>") : r
            };
        }
        for (s in n) {
            a = n[s];
            n[s] = Presenters.Helper.templates[a];
        }
        return Helpers.renderTemplate(Presenters.Helper.templates[e])(i, n);
    };
    Helper.unsafeUnescapeHTML = function(e) {
        if (e == null) {
            e = ""
        };
        return $("<div/>").html(e).text();
    };
    Helper.unsafeStripHTML = function(e) {
        var t, n;
        if (e == null) {
            e = ""
        };
        if (_.isString(e) && "" !== e) {
            n = new DOMParser();
            t = $(n.parseFromString(e, "text/html"));
            t.find("img").replaceWith(function() {
                var e, t, n, r, o, i, s;
                if (((i = this.previousSibling) != null ? i.nodeType : undefined) === 3) {
                    o = this.previousSibling.textContent;
                } else {
                    o = "";
                }
                if (((s = this.nextSibling) != null ? s.nodeType : undefined) === 3) {
                    r = this.nextSibling.textContent;
                } else {
                    r = "";
                }
                n = o.length > 0 && !o.match(/\s$/);
                t = r.length > 0 && !r.match(/^\s/);
                e = this.getAttribute("alt");
                if (e) {
                    if (n && t) {
                        return " " + e + " ";
                    }
                    if (n) {
                        return " " + e;
                    }
                    if (t) {
                        return e + " ";
                    }
                    return e;
                }
                if (n && t) {
                    return " ";
                }
                return "";
            });
            t.find("br").replaceWith(function() {
                return " ";
            });
            Helpers.TimeHelper.updateTimestamps(t);
            return t.text();
        }
        return;
    };
    Helper.stripExcessWhitespace = function(e) {
        var t;
        return (e != null && typeof e.replace == "function" && typeof (t = e.replace(/\s+/g, " ")).trim == "function" ? t.trim() : undefined) || "";
    };
    Helper.sliceExcerpt = function(e, t) {
        if (t == null) {
            t = 200
        };
        if ((e != null ? e.trim : undefined) != null) {
            return Presenters.Helper.stripExcessWhitespace(e.trim().slice(0, t));
        }
        return;
    };
    Helper.keyValuePairs = function(e) {
        var t, n, r;
        t = function() {
            var t;
            t = [];
            for (n in e) {
                r = e[n];
                if (n && r) {
                    t.push({
                        key: n,
                        value: Presenters.Helper.escape(r).replace(/\n/g, "<br/>")
                    });
                } else {
                    t.push(undefined);
                }
            }
            return t;
        }();
        return _.compact(t);
    };
    Helper.escape = function(e) {
        return $("<div/>").text(e).html();
    };
    Helper.autoLink = function(e, t) {
        var n;
        if (t == null) {
            t = {}
        };
        if (_.isString(e)) {
            n = Collections.Tags.everyoneTags.concat(Collections.Tags.teamTags);
            return Helpers.autoLink(e, {
                hashtagClass: "tag",
                mentionClass: "mention tag",
                hashtagUrlBase: Helpers.absoluteUrlFor({
                    flow: t.flowPath
                }) + "?filter=all&tags=",
                users: t.users,
                everyoneTags: n
            });
        }
        return;
    };
    Helper.restifyFilepaths = function(e) {
        var t, n, r, o, i, s, a, u, l, c, p;
        if (_.isString(e) && "" !== e) {
            for (u = new DOMParser(), t = u.parseFromString(e, "text/html"), l = t.querySelectorAll("img"), 
            o = 0, s = l.length; s > o; o++) {
                n = l[o];
                p = n.getAttribute("src");
                if (p && p.match(/^\/files/)) {
                    n.setAttribute("src", "/rest" + p)
                };
            }
            for (c = t.querySelectorAll("a"), i = 0, a = c.length; a > i; i++) {
                n = c[i];
                r = n.getAttribute("href");
                if (r && r.match(/^\/files/)) {
                    n.setAttribute("href", "/rest" + r)
                };
            }
            return t.body.innerHTML;
        }
    };
    Helper.capitalize = function(e) {
        return e.split(" ").map(function(e) {
            return capitalizeFirst(e);
        }).join(" ");
    };
    Helper.capitalizeFirst = function(e) {
        var t;
        e || (e = "");
        return "" + (((t = e[0]) != null ? t.toUpperCase() : undefined) || "") + e.slice(1);
    };
    return Helper;
}();

r = function(e, t) {
    if (t == null) {
        t = null
    };
    return Helpers.assetPath("/avatars/" + e + "/" + t);
};
