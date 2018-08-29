$(function() {
    return $(window).on("drop", function(e) {
        if ($(e.target).is(":enabled")) {
            return undefined;
        }
        return e.preventDefault();
    });
});
