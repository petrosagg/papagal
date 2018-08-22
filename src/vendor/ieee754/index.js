exports.read = function(e, t, n, r, o) {
    var i, s, a = 8 * o - r - 1, u = (1 << a) - 1, l = u >> 1, c = -7, p = n ? o - 1 : 0, d = n ? -1 : 1, h = e[t + p];
    for (p += d, i = h & (1 << -c) - 1, h >>= -c, c += a; c > 0; i = 256 * i + e[t + p], 
    p += d, c -= 8) {
    }
    for (s = i & (1 << -c) - 1, i >>= -c, c += r; c > 0; s = 256 * s + e[t + p], p += d, 
    c -= 8) {
    }
    if (i === 0) {
        i = 1 - l;
    } else {
        if (i === u) {
            if (s) {
                return NaN;
            }
            return (h ? -1 : 1) * (1 / 0);
        }
        s += Math.pow(2, r);
        i -= l;
    }
    return (h ? -1 : 1) * s * Math.pow(2, i - r);
};

exports.write = function(e, t, n, r, o, i) {
    var s, a, u, l = 8 * i - o - 1, c = (1 << l) - 1, p = c >> 1, d = o === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = r ? 0 : i - 1, f = r ? 1 : -1, m = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
    for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t) / Math.LN2), 
    t * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), t += s + p >= 1 ? d / u : d * Math.pow(2, 1 - p), 
    t * u >= 2 && (s++, u /= 2), s + p >= c ? (a = 0, s = c) : s + p >= 1 ? (a = (t * u - 1) * Math.pow(2, o), 
    s += p) : (a = t * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; e[n + h] = 255 & a, 
    h += f, a /= 256, o -= 8) {
    }
    for (s = s << o | a, l += o; l > 0; e[n + h] = 255 & s, h += f, s /= 256, l -= 8) {
    }
    e[n + h - f] |= 128 * m;
};