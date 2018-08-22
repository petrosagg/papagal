"use strict";

function r(e) {
    switch (e) {
      case 10:
      case 33:
      case 35:
      case 36:
      case 37:
      case 38:
      case 42:
      case 43:
      case 45:
      case 58:
      case 60:
      case 61:
      case 62:
      case 64:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 123:
      case 125:
      case 126:
        return !0;

      default:
        return !1;
    }
}

module.exports = function(e, t) {
    for (var n = e.pos; n < e.posMax && !r(e.src.charCodeAt(n)); ) {
        n++;
    }
    if (n === e.pos) {
        return !1;
    }
    t || (e.pending += e.src.slice(e.pos, n));
    e.pos = n;
    return !0;
};
