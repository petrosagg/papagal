var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Collections.FlowGroups = function(e) {
    function FlowGroups() {
        this.removeMembers = r(this.removeMembers, this);
        this.addMembers = r(this.addMembers, this);
        this.updateGroup = r(this.updateGroup, this);
        this.consume = r(this.consume, this);
        return FlowGroups.__super__.constructor.apply(this, arguments);
    }
    o(FlowGroups, e);
    FlowGroups.prototype.model = Models.FlowGroup;
    FlowGroups.prototype.handles = function() {
        return this.models.map(function(e) {
            return e.get("handle");
        });
    };
    FlowGroups.prototype.ids = function() {
        return this.models.map(function(e) {
            return e.id;
        });
    };
    FlowGroups.prototype.getByHandle = function(e) {
        return this.models.filter(function(t) {
            return t.get("handle").toLowerCase() === e.toLowerCase();
        })[0];
    };
    FlowGroups.prototype.url = function() {
        return this.flow.url() + "/flow_groups";
    };
    FlowGroups.prototype.consume = function(e) {
        var t;
        t = [ "create", "destroy", "members-added", "members-removed", "update" ];
        return this.addStream(e.filter(function(e) {
            return e.event === "flow-group";
        }).filter(function(e) {
            var n;
            n = e.content.type;
            return s.call(t, n) >= 0;
        }).onValue(function(e) {
            return function(t) {
                var n;
                switch (n = t.content.flow_group, t.content.type) {
                  case "create":
                    return e.add(n);

                  case "destroy":
                    return e.remove(n.id);

                  case "update":
                    return e.updateGroup(n);

                  case "members-added":
                    return e.addMembers(n, t.content.userIds);

                  case "members-removed":
                    return e.removeMembers(n, t.content.userIds);
                }
            };
        }(this)));
    };
    FlowGroups.prototype.updateGroup = function(e) {
        var t;
        if ((t = this.get(e.id)) != null) {
            return t.set(e);
        }
        return;
    };
    FlowGroups.prototype.addMembers = function(e, t) {
        var n;
        n = this.get(e.id);
        if (n) {
            return n.set("members", n.get("members").concat(t.map(function(e) {
                return {
                    id: e
                };
            })));
        }
        return;
    };
    FlowGroups.prototype.removeMembers = function(e, t) {
        var n, r;
        n = this.get(e.id);
        if (n) {
            r = _.filter(n.get("members"), function(e) {
                var n;
                n = e.id;
                return s.call(t, n) < 0;
            });
            return n.set("members", r);
        }
        return;
    };
    return FlowGroups;
}(Flowdock.Collection);