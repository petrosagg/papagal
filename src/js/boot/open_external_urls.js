var r;

r = function(e) {
    var t, n;
    if (!e.isDefaultPrevented()) {
        if (e.target.tagName.toLowerCase() === "a") {
            t = e.target;
        } else {
            t = e.currentTarget;
        }
        if (t.target === "_blank") {
            n = window.open(t.href, "_blank");
            n.opener = null;
            return e.preventDefault();
        }
        return;
    }
};

if (!(window.macgap || window.windowsApp)) {
    $(document).on("click", "a[href]", r)
};
