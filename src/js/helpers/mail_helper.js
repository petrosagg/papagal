Helpers.MailHelper = {
    mailtoUrl: function(e, t, n) {
        var r, o, i, s, a, u, l, c, p, d, h, f;
        i = "%0A> ";
        h = encodeURIComponent(e.subject);
        d = moment(n).format("MMMM D, YYYY (LT)") + ", ";
        s = "%0A%0AOn " + d + " " + encodeURIComponent((e != null && (a = e.from[0]) != null ? a.name : undefined) || ((u = e.from[0]) != null ? u.address : undefined)) + " wrote:" + i;
        if (_.isArray(e.content)) {
            o = e.content[0];
        } else {
            o = e.content;
        }
        if (_.isString(o)) {
            o = o.replace(/<img /g, "<img src ");
            r = $("<div />").html(o.replace(/(<br \/>|<br>)/g, "\n")).text();
            r = r.replace(/(\r\n|\r|\n|\u0085|\u000C|\u2028|\u2029)/g, i);
            r = r.replace(new RegExp("^(" + i + "\\s*)+"), "");
            r = r.replace(new RegExp("(" + i + "\\s*)+$"), "");
            r = r.replace(new RegExp("(" + i + "\\s*){2,}", "g"), i + i);
            r = encodeURIComponent(r.replace(/\&amp;/g, "&"));
        } else {
            r = "";
        }
        if (t === "reply") {
            f = ((l = e.replyTo) != null && (c = l[0]) != null ? c.address : undefined) || ((p = e.from[0]) != null ? p.address : undefined);
        } else {
            f = "";
        }
        if (t === "reply") {
            h = "Re: " + h;
        } else {
            h = "Fwd: " + h;
        }
        return "mailto:" + f + "?subject=" + h + "&body=" + s + r.replace(/%250A/g, "%0A");
    }
};
