Helpers.MailHelper = {
    mailtoUrl: function(e, t, n) {
        var r, o, i, s, a, u, l, c, p, d, h, f;
        i = "%0A> ";
        h = encodeURIComponent(e.subject);
        d = moment(n).format("MMMM D, YYYY (LT)") + ", ";
        s = "%0A%0AOn " + d + " " + encodeURIComponent((e != null && (a = e.from[0]) != null ? a.name : void 0) || ((u = e.from[0]) != null ? u.address : void 0)) + " wrote:" + i;
        o = _.isArray(e.content) ? e.content[0] : e.content;
        _.isString(o) ? (o = o.replace(/<img /g, "<img src "), r = $("<div />").html(o.replace(/(<br \/>|<br>)/g, "\n")).text(), 
        r = r.replace(/(\r\n|\r|\n|\u0085|\u000C|\u2028|\u2029)/g, i), r = r.replace(new RegExp("^(" + i + "\\s*)+"), ""), 
        r = r.replace(new RegExp("(" + i + "\\s*)+$"), ""), r = r.replace(new RegExp("(" + i + "\\s*){2,}", "g"), i + i), 
        r = encodeURIComponent(r.replace(/\&amp;/g, "&"))) : r = "";
        f = t === "reply" ? ((l = e.replyTo) != null && (c = l[0]) != null ? c.address : void 0) || ((p = e.from[0]) != null ? p.address : void 0) : "";
        h = t === "reply" ? "Re: " + h : "Fwd: " + h;
        return "mailto:" + f + "?subject=" + h + "&body=" + s + r.replace(/%250A/g, "%0A");
    }
};