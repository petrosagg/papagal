var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

Models.Filter = function() {
    function Filter(e) {
        var t, n, r, o;
        if (e == null) {
            e = {}
        };
        n = e.label;
        if (n) {
            this.label = n
        }
        if (this.event == null) {
            this.event = []
        };
        this.iconUrl = e.iconUrl;
        if (this.tags == null) {
            this.tags = []
        };
        if (this.application == null) {
            this.application = []
        };
        if (_.isArray(e.event)) {
            this.event = _.uniq(this.event.concat(e.event));
        } else {
            if (e.event) {
                this.event = _.uniq(this.event.concat(e.event.split(",")))
            };
        }
        if (!e.application) {
            e.application = e.activity
        };
        t = this._toStringArray(e.application || e.activity).map(function(e) {
            return Number(e);
        });
        this.application = _.uniq(this.application.concat(t));
        if (_.isArray(e.tags)) {
            this.tags = _.uniq(this.tags.concat(_.map(e.tags, function(e) {
                return (e != null ? e.id : undefined) || e;
            })));
        } else {
            if (e.tags) {
                this.tags = _.uniq(this.tags.concat(e.tags.split(",")))
            };
        }
        if ((r = (o = e.tagMode) != null ? o.toLowerCase() : undefined) === "and" || r === "or") {
            this.tagMode = e.tagMode
        };
    }
    Filter.prototype.tagMode = "and";
    Filter.build = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        if (e.query) {
            return new Models.Filter.Search(e);
        }
        if (e.slug && Models.Filter.filterMap()[e.slug]) {
            return new (t = Models.Filter.filterMap()[e.slug])(e);
        }
        return new Models.Filter(e);
    };
    Filter.fromQuery = function(e) {
        var t, n;
        n = e.filter;
        t = _.extend({}, _.omit(e, "filter"), {
            slug: n
        });
        return Models.Filter.build(t);
    };
    Filter.filterMap = function() {
        return {
            files: Models.Filter.Files,
            links: Models.Filter.Links
        };
    };
    Filter.labelMap = function() {
        return {
            mail: "Push API",
            twitter: "Twitter",
            vcs: "Git",
            jira: "JIRA",
            mercurial: "Bitbucket",
            hg: "Mercurial",
            svn: "Subversion",
            kiln: "Kiln",
            confluence: "Confluence",
            activity: "API",
            discussion: "API",
            file: "Files",
            perforce: "Perforce"
        };
    };
    Filter.prototype._toStringArray = function(e) {
        if (e == null) {
            return [];
        }
        if (_.isArray(e)) {
            return e;
        }
        return ("" + e).split(",");
    };
    Filter.prototype.className = function() {
        if (this.slug) {
            if (this.slug === "all") {
                return this.slug;
            }
            return this.slug + "-only";
        }
        if (this.event.length === 1) {
            return this.event[0];
        }
        return;
    };
    Filter.prototype.subsetOf = function(e) {
        if (this.isAll() && !e.isAll()) {
            return false;
        }
        return this.query === e.query && _.difference(e.tags, this.tags).length === 0 && _.difference(this.event, e.event).length === 0;
    };
    Filter.prototype.isEqual = function(e) {
        return e.subsetOf(this) && this.subsetOf(e);
    };
    Filter.prototype.notEqual = function(e) {
        return !this.isEqual(e);
    };
    Filter.prototype.isAll = function() {
        return this.event.length === 0 && this.tags.length === 0 && !this.query && this.application.length === 0;
    };
    Filter.prototype.matchesTo = function(e) {
        var t, n, r;
        n = function(e) {
            return function(t) {
                if (_.isArray(e.event) && e.event.length > 0) {
                    return _.include(e.event, t.event);
                }
                return true;
            };
        }(this);
        t = function(e) {
            return function(t) {
                if (_.isArray(e.application) && e.application.length > 0) {
                    return _.include(e.application, t._application);
                }
                return true;
            };
        }(this);
        r = function(e) {
            return function(t) {
                var n, r, o, i;
                if (_.isArray(e.tags) && e.tags.length > 0) {
                    if (e.tagMode === "or") {
                        for (o = e.tags, n = 0, r = o.length; r > n; n++) {
                            i = o[n];
                            if (_.include(t.tags, i)) {
                                return true;
                            }
                        }
                        return false;
                    }
                    return _.difference(e.tags, t.tags).length === 0;
                }
                return true;
            };
        }(this);
        return !this.query && t(e) && n(e) && r(e);
    };
    Filter.prototype.normalize = function(e) {
        return this.tags = this.tags.map(function(t) {
            return e.tags.getByHumanized(t).id;
        });
    };
    Filter.prototype.merge = function(e) {
        return Models.Filter.build({
            slug: e.slug || this.slug,
            event: this.event.concat(e.event),
            tags: this.tags.concat(e.tags),
            query: e.query || this.query,
            application: e.application,
            iconUrl: e.iconUrl || this.iconUrl
        });
    };
    Filter.prototype.queryString = function(e) {
        var t;
        t = this.asVisibleParams(e);
        if (_.isEmpty(t) && this.slug === "inbox") {
            return "";
        }
        return Helpers.generateQuery(_.extend({
            filter: this.slug
        }, t), {
            showEmpty: false
        });
    };
    Filter.prototype.asVisibleParams = function(e) {
        return o({
            event: this.slug ? _.difference(this.event, this.constructor.prototype.event) : this.event,
            tags: r(this.slug ? _.difference(this.tags, this.constructor.prototype.tags) : this.tags, e),
            query: this.query,
            activity: this.application
        });
    };
    Filter.prototype.asParams = function() {
        var e;
        return o({
            event: this.event,
            tags: this.tags,
            search: this.query,
            tag_mode: ((e = this.tags) != null ? e.length : undefined) ? this.tagMode : undefined,
            activity: this.application
        });
    };
    Filter.prototype.inboxFilter = function() {
        return this.slug === "inbox" || this.event.length > 0 && _.all(this.event, function(e) {
            return _.include(Models.Filter.Inbox.prototype.event, e);
        });
    };
    Filter.prototype.getLabel = function() {
        var e;
        if (this.label) {
            return this.label;
        }
        if (this.event.length === 1 && (e = Models.Filter.labelMap()[this.event[0]])) {
            return e;
        }
        return this.event.length + " Events";
    };
    Filter.prototype.toString = function() {
        var e;
        if (_.isString(this.application) || ((e = this.application) != null ? e.length : undefined) > 0) {
            return this.label;
        }
        return Models.Filter.labelMap()[this.event] || this.label;
    };
    Filter.prototype.icon = function() {
        var e;
        if ((e = this.application) != null && e.length) {
            return undefined;
        }
        return this.event;
    };
    Filter.prototype.type = function() {
        return "filter";
    };
    Filter.prototype.isCustom = function() {
        return this.event.length || _.any(this.tags, function(e) {
            return e === ":thread" || e === ":url";
        });
    };
    Filter.prototype.isEmpty = function() {
        return !(this.event && this.event.length !== 0 || this.query && this.query !== "" || this.tags && this.tags.length !== 0);
    };
    return Filter;
}();

Models.Filter.Inbox = function(e) {
    function Inbox(e) {
        var n;
        if (e == null) {
            e = {}
        };
        Inbox.__super__.constructor.apply(this, arguments);
        if ((n = e.event) != null && n.length) {
            _.isArray(e.event) ? this.event = e.event : this.event = e.event.split(",")
        };
    }
    i(Inbox, e);
    Inbox.prototype.slug = "inbox";
    Inbox.prototype.label = "Inbox";
    Inbox.prototype.event = [ "mail", "twitter", "vcs", "jira", "mercurial", "hg", "svn", "kiln", "confluence", "activity", "discussion" ];
    Inbox.prototype.className = function() {
        if (this.event.length === 1) {
            return this.event[0];
        }
        return "inbox-only";
    };
    Inbox.prototype.getLabel = function() {
        if (this.event.length === 1) {
            return Models.Filter.labelMap()[this.event[0]];
        }
        return this.label;
    };
    Inbox.prototype.inboxFilter = function() {
        return true;
    };
    Inbox.prototype.asVisibleParams = function(e) {
        return o({
            event: this.event.length > 1 ? _.difference(this.event, this.constructor.prototype.event) : this.event,
            tags: r(this.tags, e)
        });
    };
    return Inbox;
}(Models.Filter);

Models.Filter.Application = function(e) {
    function Application() {
        return Application.__super__.constructor.apply(this, arguments);
    }
    i(Application, e);
    Application.prototype.event = null;
    return Application;
}(Models.Filter.Inbox);

Models.Filter.Chat = function(e) {
    function Chat() {
        return Chat.__super__.constructor.apply(this, arguments);
    }
    i(Chat, e);
    Chat.prototype.slug = "chat";
    Chat.prototype.label = "Chat";
    Chat.prototype.event = [ "message", "comment", "file", "action", "status", "user-edit", "line" ];
    return Chat;
}(Models.Filter);

Models.Filter.All = function(e) {
    function All() {
        return All.__super__.constructor.apply(this, arguments);
    }
    i(All, e);
    All.prototype.slug = "all";
    All.prototype.label = "All";
    All.prototype.event = Models.Filter.Chat.prototype.event.concat(Models.Filter.Inbox.prototype.event);
    return All;
}(Models.Filter);

Models.Filter.Files = function(e) {
    function Files() {
        return Files.__super__.constructor.apply(this, arguments);
    }
    i(Files, e);
    Files.prototype.slug = "files";
    Files.prototype.label = "Files";
    Files.prototype.event = [ "file" ];
    return Files;
}(Models.Filter);

Models.Filter.Links = function(e) {
    function Links() {
        return Links.__super__.constructor.apply(this, arguments);
    }
    i(Links, e);
    Links.prototype.slug = "links";
    Links.prototype.label = "Links";
    Links.prototype.tags = [ ":url" ];
    Links.prototype.icon = "fa fa-fw fa-link";
    return Links;
}(Models.Filter);

Models.Filter.Comments = function(e) {
    function Comments(e, n) {
        this.parent = e;
        if (n == null) {
            n = {}
        };
        Comments.__super__.constructor.call(this, n);
    }
    i(Comments, e);
    Comments.prototype.subsetOf = function(e) {
        return false;
    };
    Comments.prototype.matchesTo = function(e) {
        return this.parent.id && _.include(e.tags, "influx:" + this.parent.id) && Comments.__super__.matchesTo.call(this, e);
    };
    Comments.prototype.asParams = function() {
        var e, n;
        e = Comments.__super__.asParams.apply(this, arguments);
        if (this.parent.id != null) {
            n = "influx:" + this.parent.id;
            if (e.tags != null) {
                e.tags += "," + n;
            } else {
                e.tags = n;
            }
        };
        return e;
    };
    return Comments;
}(Models.Filter);

Models.Filter.Search = function(e) {
    function Search(e) {
        if (e == null) {
            e = {}
        };
        this.query = e.query;
        this.tags = [];
    }
    i(Search, e);
    Search.prototype.slug = "search";
    Search.prototype.label = "Search";
    Search.prototype.event = Models.Filter.All.prototype.event;
    return Search;
}(Models.Filter);

o = function(e) {
    return _.reduce(e, function(e, t, n) {
        if (n && (t != null ? t.length : undefined)) {
            e[n] = _.isArray(t) ? t.join(",") : t
        };
        return e;
    }, {});
};

r = function(e, t) {
    return e.map(function(e) {
        e = t.tags.getOrAdd(e).toString();
        if (e[0] === "#") {
            return e.slice(1);
        }
        return e;
    });
};

Models.Filter.Thread = function(e) {
    function Thread(e, n) {
        this.thread = e;
        if (n == null) {
            n = {}
        };
        Thread.__super__.constructor.call(this, n);
    }
    i(Thread, e);
    Thread.prototype.subsetOf = function(e) {
        return false;
    };
    Thread.prototype.matchesTo = function(e) {
        return this.thread && this.thread === e.thread_id && e.persist !== false;
    };
    Thread.prototype.asParams = function() {
        return {};
    };
    return Thread;
}(Models.Filter);
