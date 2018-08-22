module.exports = function(e) {
    if (e) {
        return e.replace(/^\w/, function(e) {
            return e.toUpperCase();
        });
    }
    return null;
};
