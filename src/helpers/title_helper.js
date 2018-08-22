Helpers.setWindowTitle = function(e, t, n) {
    var r;
    r = "";
    if (t || n) {
        r += "(" + (n > 0 ? "" + n : "*") + ") "
    };
    if (e && e.get("name")) {
        r += "" + e.get("name"), e.get("organization") && (r += " (" + e.get("organization").name + ")"), 
        r += " - "
    };
    r += "Flowdock";
    return window.document.title = r;
};