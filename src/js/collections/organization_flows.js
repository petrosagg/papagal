var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Collections.OrganizationFlows = function(e) {
    function OrganizationFlows(e, n) {
        var r;
        if (n == null) {
            n = {}
        };
        if (n != null && n.organization) {
            this.organization = n.organization
        };
        r = function(e) {
            return String(e.get("organization").id) === String(n.organization) && e.get("open");
        };
        OrganizationFlows.__super__.constructor.call(this, e, _.extend({
            filter: r
        }, n));
    }
    r(OrganizationFlows, e);
    return OrganizationFlows;
}(BackboneProjections.Filtered);
