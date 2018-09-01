var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v;

r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

h = "reorderable";

s = h + ".data";

u = function(e) {
    return e.data(s);
};

f = function(e, t) {
    return e.data(s, t);
};

v = function() {
    var e;
    e = u(this);
    if (this.data) {
        this.removeClass(e != null ? e.options.namespace : undefined).removeClass(e != null ? e.options.className : undefined);
        f(this, null);
        return this.off("." + h);
    }
    return;
};

o = function(e) {
    var t;
    t = u(this);
    if (t) {
        return undefined;
    }
    t = {};
    this.addClass(e.namespace).addClass(e.className);
    t.options = e;
    f(this, t);
    this.on("mousedown." + h, r(l, this));
    this.on("mouseup." + h, r(p, this));
    this.on("mousemove." + h, r(c, this));
    return this.on("dragstart." + h, function(e) {
        e.preventDefault();
        return false;
    });
};

l = function(e) {
    var t;
    if (e.button !== 2) {
        t = u(this);
        t.mousePressed = true;
        t.initialMouseCoordinates = {
            pageX: e.pageX,
            pageY: e.pageY
        };
        t.timer = setTimeout(function(e) {
            return function() {
                return m.call(e);
            };
        }(this), t.options.dragstartTimeout);
        return t.offsetTriggered = false;
    }
};

p = function(e) {
    return g.call(this);
};

c = function(e) {
    var t, n;
    t = u(this);
    if (t.mousePressed) {
        n = t.offsetTriggered;
        n || (n = Math.abs(e.pageY - t.initialMouseCoordinates.pageY + this.parent().scrollTop()) >= t.options.dragstartOffset, 
        t.offsetTriggered = n);
        if (n) {
            return m.call(this);
        }
        return;
    }
    return;
};

i = function(e) {
    var t;
    t = $("<div></div>").addClass(e.dragOverlayClass);
    t.css({
        position: "absolute",
        top: 0,
        left: 0,
        width: $(window).width(),
        height: $(window).height(),
        "z-index": 2001
    });
    t.on("mousemove", r(d, this));
    $(window).one("mouseup", r(a, this));
    return t;
};

m = function() {
    var e, t, n, r;
    e = u(this);
    if (e && !e.dragging && this.parent().children("." + e.options.namespace + ":visible").length !== 1) {
        e.dragging = true;
        r = this.parent().scrollTop();
        if (this.parent().css("position") === "static") {
            this.parent().css({
                position: "relative"
            })
        };
        t = this.clone().addClass(e.options.draggableClass);
        t.css({
            width: this.width() + "px",
            height: this.height() + "px",
            left: this.position().left + "px",
            top: this.position().top + r + "px",
            position: "absolute"
        });
        n = i.call(this, e.options);
        this.addClass(e.options.draggedClass);
        e.overlay = n;
        e.draggable = t;
        e.initialElementCoordinates = this.position();
        $("body").append(n);
        return this.parent().append(t);
    }
    return;
};

g = function() {
    var e, t, n, r, o;
    e = u(this);
    if ((n = e.overlay) != null) {
        n.off()
    };
    if ((r = e.overlay) != null) {
        r.remove()
    };
    if ((o = e.draggable) != null) {
        o.remove()
    };
    clearTimeout(e.timer);
    t = e.options;
    e = {
        options: t
    };
    f(this, e);
    return this.removeClass(e.options.draggedClass);
};

d = function(e) {
    var t, n, r, o, i, s, a, l, c, p;
    p = function(e) {
        var t, n, r, o;
        if (e.length === 0) {
            return false;
        }
        t = e.height() / 2;
        o = e.position().top;
        r = o - t;
        n = o + t;
        return i - c > r && n > i - c;
    };
    t = u(this);
    s = t.options;
    c = this.parent().scrollTop();
    r = e.pageY - t.initialMouseCoordinates.pageY + c;
    a = parseFloat(t.draggable.css("top"));
    i = t.initialElementCoordinates.top + r;
    if (a > i) {
        n = "up";
    } else {
        n = "down";
    }
    t.draggable.css({
        top: i
    });
    o = this.next("." + s.className);
    l = this.prev("." + s.className);
    if (n === "up") {
        if (l.is(":hidden") || p(l)) {
            l.before(this)
        };
    } else {
        if (o.is(":hidden") || p(o)) {
            o.after(this)
        };
    }
    return this;
};

a = function(e) {
    var t;
    t = u(this).options;
    g.call(this);
    return t.drop(this.parent().children("." + t.namespace).index(this));
};

$.fn.reorderable = function(e) {
    var t;
    if (e === "destroy") {
        this.each(function() {
            return v.call($(this));
        });
    } else {
        t = {
            className: "tabs-reorderable",
            namespace: "reorderable",
            dragstartTimeout: 500,
            dragstartOffset: 10,
            draggableClass: "dragging",
            draggedClass: "being-dragged",
            dragOverlayClass: "dragging-overlay",
            drop: function(e) {}
        };
        e = $.extend(t, e);
        this.each(function() {
            return o.call($(this), e);
        });
    }
    return this;
};
