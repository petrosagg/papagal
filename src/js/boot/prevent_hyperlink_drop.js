$(function() {
    return $(window).on("drop", function(e) {
        if ($(e.target).is(":enabled")) {
            return void 0;
        }
        return e.preventDefault();
    });
});
