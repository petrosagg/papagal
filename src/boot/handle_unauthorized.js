$(document).ajaxError(function(e, t, n, r) {
    if (t.status === 403 && t.getResponseHeader("Flowdock-Authenticate")) {
        return Helpers.postBrowser("/session", "delete");
    }
    return;
});