var r, o, i, s, a;

o = function(e) {
    var t, n;
    n = moment(e.attr("datetime"));
    t = r(e, Helpers.TimeHelper.calendarTime(n));
    if (e.text() !== t) {
        return e.text(t);
    }
    return;
};

i = function(e) {
    var t, n;
    n = moment(e.attr("datetime"));
    t = r(e, n.format(Helpers.TimeHelper.detailedTimestampOptions(n).textFormat));
    if (e.text() !== t) {
        return e.text(t);
    }
    return;
};

s = function(e) {
    var t, n;
    n = moment(e.attr("datetime"));
    t = r(e, n.fromNow());
    if (e.text() !== t) {
        return e.text(t);
    }
    return;
};

r = function(e, t) {
    var n, r;
    r = e.attr("data-before") || "";
    n = e.attr("data-after") || "";
    return [ r, t, n ].join(" ");
};

a = function(e) {
    var t, n;
    n = moment(e.attr("datetime"));
    t = n.format("LLL");
    if (e.text() !== t) {
        return e.text(t);
    }
    return;
};

Helpers.TimeHelper = {
    timestamp: function(e, t) {
        if (t == null) {
            t = {}
        };
        return function() {
            return Helpers.TimeHelper.render(e, t);
        };
    },
    detailedTimestamp: function(e, t) {
        if (t == null) {
            t = {}
        };
        return function() {
            t = Helpers.TimeHelper.detailedTimestampOptions(e, t);
            return Helpers.TimeHelper.render(e, t);
        };
    },
    detailedTimestampOptions: function(e, t) {
        if (t == null) {
            t = {}
        };
        if (!t.classes) {
            t.classes = "timestamp detailed"
        };
        if (moment().startOf("day").diff(e) > 0) {
            t.textFormat = "MMM D, YYYY LT";
        } else {
            t.textFormat = "LT";
        }
        return t;
    },
    editTime: function(e, t) {
        if (e) {
            return Helpers.TimeHelper.detailedTimestamp(e, {
                classes: t ? "detailed message-delete-time" : "detailed message-edit-time"
            });
        }
        return;
    },
    calendarTime: function(e, t) {
        var n, r, o, i;
        if (t == null) {
            t = false
        };
        i = moment().startOf("day");
        n = e.diff(i, "days", true);
        if (t) {
            if (n < 1 && n >= 0) {
                o = "at ";
            } else {
                o = "on ";
            }
        } else {
            o = "";
        }
        if (n < -364) {
            r = "MMM D, YYYY";
        } else {
            if (n < -6) {
                r = "MMM D";
            } else {
                if (n < 0) {
                    r = "ddd [at] LT";
                } else {
                    if (n < 1) {
                        r = "LT";
                    } else {
                        r = "MMM D, YYYY";
                    }
                }
            }
        }
        return o + e.format(r);
    },
    relativeTime: function(e) {
        return e.fromNow();
    },
    render: function(e, t) {
        var n, r, o;
        if (t == null) {
            t = {}
        };
        r = {
            classes: "timestamp",
            calendar: false,
            relative: false,
            preposition: false,
            textFormat: "LT",
            datetimeFormat: "YYYY-MM-DDTHH:mm:ss",
            timestampFormat: "LLL",
            before: "",
            after: "",
            justNowFor: 0,
            justNowText: "a moment ago"
        };
        t = _.extend(r, t);
        if (!moment.isMoment(e)) {
            e = moment(e)
        };
        if (t.calendar) {
            t.classes += " calendar"
        };
        if (t.relative) {
            t.classes += " relative"
        };
        n = $("<time>").attr({
            datetime: e.format(t.datetimeFormat),
            title: e.format(t.timestampFormat),
            class: t.classes
        }).text(function() {
            var n;
            if (t.justNowFor > 0 && Date.now() - e.valueOf() < t.justNowFor) {
                n = t.justNowText;
            } else {
                if (t.calendar) {
                    n = Helpers.TimeHelper.calendarTime(e, t.preposition);
                } else {
                    if (t.relative) {
                        n = Helpers.TimeHelper.relativeTime(e);
                    } else {
                        n = e.format(t.textFormat);
                    }
                }
            }
            return [ t.before, n, t.after ].join(" ");
        });
        if (t.before.length > 0) {
            n.attr("data-before", t.before)
        };
        if (t.after.length > 0) {
            n.attr("data-after", t.after)
        };
        if (t.link != null) {
            o = $("<a>").attr(t.link).addClass("timestamp-link"), n = o.append(n)
        };
        return n[0].outerHTML;
    },
    updateTimestamps: function(e) {
        $(e).find("time[is=relative-time]").each(function() {
            return s($(this));
        });
        return $(e).find("time[is=local-time]").each(function() {
            return a($(this));
        });
    },
    updateAllTimestamps: function() {
        return $("time.calendar").each(function() {
            return o($(this));
        });
    },
    updateDetailedTimestamps: function() {
        return $("time.detailed").each(function() {
            return i($(this));
        });
    },
    updateRelativeTimestamps: function() {
        return $("time.relative").each(function() {
            return s($(this));
        });
    },
    updateGlobalLocale: function(e) {
        moment.locale(e);
        return $("time[datetime]").each(function() {
            var e;
            e = $(this);
            e.attr({
                title: moment(e.attr("datetime")).format("LLL")
            });
            if (e.is(".calendar")) {
                return o(e);
            }
            if (e.is(".detailed")) {
                return i(e);
            }
            if (e.is(".relative")) {
                return s(e);
            }
            return a(e);
        });
    },
    userPresence: function(e, t) {
        var n, r, o;
        if (t == null) {
            t = {}
        };
        n = e.presenceModel();
        if (n == null) {
            return "Activity unknown";
        }
        o = n.get("updated_at");
        return r = n.state() === "active" ? "Online, currently active" : n.state() === "idle" ? "Online, " + Helpers.TimeHelper.timestamp(new Date(o), {
            relative: true,
            before: "active",
            justNowFor: 3e5
        })() : o != null ? Helpers.TimeHelper.timestamp(new Date(o), {
            calendar: true,
            before: "Offline since",
            justNowFor: 3e5
        })() : "Offline";
    }
};
