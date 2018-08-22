function r(e) {
    return !(!e || !(typeof Node == "function" ? e instanceof Node : typeof e == "object" && typeof e.nodeType == "number" && typeof e.nodeName == "string"));
}

module.exports = r;