var r = require("./invariant"), o = {
    addClass: function(e, t) {
        r(!/\s/.test(t));
        if (t) {
            e.classList ? e.classList.add(t) : o.hasClass(e, t) || (e.className = e.className + " " + t)
        };
        return e;
    },
    removeClass: function(e, t) {
        r(!/\s/.test(t));
        if (t) {
            e.classList ? e.classList.remove(t) : o.hasClass(e, t) && (e.className = e.className.replace(new RegExp("(^|\\s)" + t + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, ""))
        };
        return e;
    },
    conditionClass: function(e, t, n) {
        return (n ? o.addClass : o.removeClass)(e, t);
    },
    hasClass: function(e, t) {
        r(!/\s/.test(t));
        if (e.classList) {
            return !!t && e.classList.contains(t);
        }
        return (" " + e.className + " ").indexOf(" " + t + " ") > -1;
    }
};

module.exports = o;
