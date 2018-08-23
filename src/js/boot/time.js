$(window).on("flowdock-start", function() {
    setInterval(Helpers.TimeHelper.updateAllTimestamps, 9e5);
    setInterval(Helpers.TimeHelper.updateDetailedTimestamps, 9e5);
    setInterval(Helpers.TimeHelper.updateRelativeTimestamps, 6e4);
    return Flowdock.app.router.on("all", function() {
        return _.defer(Helpers.TimeHelper.updateAllTimestamps);
    });
});
