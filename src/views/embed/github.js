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

Views.Embed.GitHub = function(t) {
    function GitHub() {
        return GitHub.__super__.constructor.apply(this, arguments);
    }
    r(GitHub, t);
    GitHub.prototype.type = "github";
    GitHub.prototype.initialize = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        GitHub.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        this.skipTimeout = e.skipTimeout;
        t = GitHub.parseGitHubUrlComponents(this.url);
        this.repoAuthor = t.author;
        this.repoName = t.repo;
        this.urlType = t.type;
        return this.gitHubApiUrl = t.apiUrl;
    };
    GitHub.prototype.load = function() {
        var e, t;
        if (this.shouldLoad() && this.gitHubApiUrl) {
            e = this.sendRequest(this.gitHubApiUrl);
            e.then(function(e) {
                return function(n) {
                    e.renderElement(n);
                    return clearTimeout(t);
                };
            }(this), function(e) {
                return function() {
                    e.cancelLoading();
                    return clearTimeout(t);
                };
            }(this));
            if (this.skipTimeout) {
                return void 0;
            }
            return t = setTimeout(function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
        }
    };
    GitHub.prototype.renderElement = function(t) {
        var n;
        switch (this.urlType) {
          case "repos":
            n = Helpers.renderTemplate(require("../../templates/embed/github.repo.mustache"))({
                repoDescription: t.description,
                repoAuthor: t.owner.login,
                repoName: t.name
            });
            break;

          case "pull":
            n = Helpers.renderTemplate(require("../../templates/embed/github.pull.mustache"))({
                author: t.user.login,
                number: t.number,
                title: t.title,
                repoAuthor: t.base.repo.owner.login,
                repoName: t.base.repo.name
            });
            break;

          case "issues":
            n = Helpers.renderTemplate(require("../../templates/embed/github.issue.mustache"))({
                author: t.user.login,
                number: t.number,
                title: t.title,
                repoAuthor: this.repoAuthor,
                repoName: this.repoName
            });
        }
        this.embed($.parseHTML(n));
        return this.render();
    };
    GitHub.prototype.cancelLoading = function() {
        return this.embed(!1);
    };
    GitHub.prototype.sendRequest = function(e) {
        return $.ajax({
            url: e,
            method: "get",
            headers: null
        });
    };
    GitHub.match = function(e) {
        return e.match(/^https?:\/\/(?:www\.)?github\.com\/[^\/]+\/[^\/]+(?:\.git)?(?:\/(?:pull|issues)\/(?:\d+)(?:\/(?:files|commits))?)?(?:\#[\w\d-_]*)?$/i);
    };
    GitHub.parseGitHubUrlComponents = function(e) {
        var t, n, r;
        if (n = e.match(/^https?:\/\/(?:www\.)?github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?(?:\/(pull|issues)\/(\d+)(?:\/(?:files|commits))?)?(?:\#[\w\d-_]*)?$/i)) {
            n[3] && n[4] ? (r = n[3], t = n[3] === "pull" ? "https://api.github.com/repos/" + n[1] + "/" + n[2] + "/pulls/" + n[4] : "https://api.github.com/repos/" + n[1] + "/" + n[2] + "/" + n[3] + "/" + n[4]) : (r = "repos", 
            t = "https://api.github.com/repos/" + n[1] + "/" + n[2])
        };
        return {
            author: (n != null ? n[1] : void 0) || null,
            repo: (n != null ? n[2] : void 0) || null,
            type: r || null,
            apiUrl: t || null
        };
    };
    return GitHub;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.GitHub);