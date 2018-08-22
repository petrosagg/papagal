function r(e) {
    return e.replace(/([A-Z])/g, function(e, t) {
        return "-" + t.toLowerCase();
    }).replace(/^ms-/, "-ms-");
}

module.exports = r;
