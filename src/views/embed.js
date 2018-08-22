Views.Embed = {
    previewers: [],
    match: function(e) {
        return Views.Embed.previewers.filter(function(t) {
            return t.match(e);
        })[0];
    },
    register: function(e, t) {
        var n;
        if (t == null) {
            t = -1
        };
        n = Views.Embed.previewers;
        if (t === -1) {
            return n.push(e);
        }
        if (t < 0) {
            return n.splice(t + 1, 0, e);
        }
        return n.splice(t, 0, e);
    }
};