function r(e) {
    e = e || {};
    this.ms = e.min || 100;
    this.max = e.max || 1e4;
    this.factor = e.factor || 2;
    if (e.jitter > 0 && e.jitter <= 1) {
        this.jitter = e.jitter;
    } else {
        this.jitter = 0;
    }
    this.attempts = 0;
}

module.exports = r;

r.prototype.duration = function() {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(), n = Math.floor(t * this.jitter * e);
        if ((1 & Math.floor(10 * t)) == 0) {
            e = e - n;
        } else {
            e = e + n;
        }
    }
    return 0 | Math.min(e, this.max);
};

r.prototype.reset = function() {
    this.attempts = 0;
};

r.prototype.setMin = function(e) {
    this.ms = e;
};

r.prototype.setMax = function(e) {
    this.max = e;
};

r.prototype.setJitter = function(e) {
    this.jitter = e;
};
