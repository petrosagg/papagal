"use strict";

var r = "[a-zA-Z_:][a-zA-Z0-9:._-]*", o = "[^\"'=<>`\\x00-\\x20]+", i = "'[^']*'", s = '"[^"]*"', a = "(?:" + o + "|" + i + "|" + s + ")", u = "(?:\\s+" + r + "(?:\\s*=\\s*" + a + ")?)", l = "<[A-Za-z][A-Za-z0-9\\-]*" + u + "*\\s*\\/?>", c = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", p = "\x3c!----\x3e|\x3c!--(?:-?[^>-])(?:-?[^-])*--\x3e", d = "<[?].*?[?]>", h = "<![A-Z]+\\s+[^>]*>", f = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", m = new RegExp("^(?:" + l + "|" + c + "|" + p + "|" + d + "|" + h + "|" + f + ")"), g = new RegExp("^(?:" + l + "|" + c + ")");

module.exports.HTML_TAG_RE = m;

module.exports.HTML_OPEN_CLOSE_TAG_RE = g;
