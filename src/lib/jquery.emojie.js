jQuery.fn.emojie = function() {
    return this.each(function() {
        var e;
        try {
            return emojie(this);
        } catch (t) {
            e = t;
        }
    });
};
