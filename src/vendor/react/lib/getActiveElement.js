function r() {
    try {
        return document.activeElement || document.body;
    } catch (e) {
        return document.body;
    }
}

module.exports = r;
