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

Views.Errors.Modal = function(e) {
    function Modal() {
        return Modal.__super__.constructor.apply(this, arguments);
    }
    r(Modal, e);
    Modal.prototype.className = "overlay-mask error";
    Modal.prototype.errorType = "modal";
    return Modal;
}(Views.Errors.Error);
