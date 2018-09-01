Views.Errors = {
    get: function(e, t) {
        var n;
        n = _.find(Views.Errors, function(n) {
            return n.prototype.errorName === e && n.prototype.errorType === t;
        });
        if (!n) {
            n = Views.Errors.Modal
        };
        return n;
    }
};
