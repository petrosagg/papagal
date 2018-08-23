var r = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

window.Presenters.TeamInbox = window.Presenters.TeamInbox || {};

window.Presenters.createPresenter = function(e, t, n) {
    var o, i;
    if (n == null) {
        n = null
    };
    i = {
        mail: Presenters.TeamInbox.Mail,
        jira: Presenters.TeamInbox.Jira,
        confluence: Presenters.TeamInbox.Confluence,
        twitter: Presenters.TeamInbox.Twitter,
        vcs: Presenters.TeamInbox.Git,
        mercurial: Presenters.TeamInbox.Mercurial,
        hg: Presenters.TeamInbox.Mercurial,
        svn: Presenters.TeamInbox.Subversion,
        kiln: Presenters.TeamInbox.Kiln,
        action: Presenters.ChatMessage.Action,
        file: Presenters.ChatMessage.File,
        "user-edit": Presenters.ChatMessage.UserEdit,
        status: Presenters.ChatMessage.LineMessage,
        line: Presenters.ChatMessage.LineMessage
    };
    if (r.call(Presenters.ChatMessage.SUPPORTED_EVENTS, e) >= 0) {
        return new Presenters.ChatMessage(e, t, n);
    }
    o = i[e];
    if (o) {
        return new o(e, t, n);
    }
    return;
};
