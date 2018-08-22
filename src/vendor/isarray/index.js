module.exports = Array.isArray || function(e) {
    return Object.prototype.toString.call(e) == "[object Array]";
};
