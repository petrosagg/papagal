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

Views.Embed.Twitter = function(t) {
    function Twitter() {
        return Twitter.__super__.constructor.apply(this, arguments);
    }
    r(Twitter, t);
    Twitter.regex = /^https?:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/([0-9]+)/;
    Twitter.prototype.type = "twitter";
    Twitter.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Twitter.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        return this.tweetId = Twitter.parseTweetId(this.url);
    };
    Twitter.prototype.load = function() {
        var e, t;
        if (this.shouldLoad()) {
            e = setTimeout(function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
            t = this.getTweetInfo();
            return t.then(function(t) {
                return function(n) {
                    t.renderElement(n);
                    return clearTimeout(e);
                };
            }(this), function(t) {
                return function() {
                    t.cancelLoading();
                    return clearTimeout(e);
                };
            }(this));
        }
    };
    Twitter.prototype.renderElement = function(t) {
        var n, r, o, i, s, a, u, l, c, p, d, h;
        try {
            n = $($.parseHTML(t.html));
            h = n.children("p");
            h = h.html();
            d = n.children("a").first().clone().append(' <i class="fa fa-external-link" />')[0].outerHTML;
            if (!((h != null ? h.length : undefined) && (d != null ? d.length : undefined))) {
                return;
            }
            if ((a = n[0]) != null && (u = a.childNodes[1]) != null && (l = u.textContent) != null) {
                c = l.trim();
            } else {
                c = undefined;
            }
            r = (c != null ? c.indexOf(t.author_name) : undefined) < 0;
            if (r && (o = c.match(/^\u2014 (.*) \(@([^(]+?)\)$/))) {
                s = o[2], i = o[1]
            };
            p = Helpers.renderTemplate(require("../../templates/embed/tweet.mustache"))({
                tweet: h,
                time: d,
                author: t.author_name,
                authorLink: t.author_url,
                isRetweet: r,
                originalAuthorName: i,
                originalAuthorUsername: s
            });
            this.embed($.parseHTML(p));
            return this.render();
        } catch (f) {
            return this.embed(!1);
        }
    };
    Twitter.prototype.showEmbed = function() {
        return this.parent.preserveScrolling(function(e) {
            return function() {
                e.$el.removeClass("no-embed");
                return e.$("a[href='" + e.url + "']").first().replaceWith(e._embedded);
            };
        }(this));
    };
    Twitter.prototype.cancelLoading = function() {
        return this.embed(false);
    };
    Twitter.prototype.getTweetInfo = function() {
        var e;
        e = "https://api.twitter.com/1/statuses/oembed.json?omit_script=true&id=" + this.tweetId + "&callback=?";
        return $.getJSON(e);
    };
    Twitter.match = function(e) {
        return Views.Embed.Twitter.regex.test(e);
    };
    Twitter.parseTweetId = function(e) {
        var t;
        t = e.match(Twitter.regex);
        if (t != null) {
            return t[1];
        }
        return;
    };
    return Twitter;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Twitter);
