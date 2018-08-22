module.exports = function(e) {
    var t = "[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*", n = "\\|[^]*?\\|", r = "(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|\\-)?\\d+)?", o = {
        className: "shebang",
        begin: "^#!",
        end: "$"
    }, i = {
        className: "literal",
        begin: "\\b(t{1}|nil)\\b"
    }, s = {
        className: "number",
        variants: [ {
            begin: r,
            relevance: 0
        }, {
            begin: "#(b|B)[0-1]+(/[0-1]+)?"
        }, {
            begin: "#(o|O)[0-7]+(/[0-7]+)?"
        }, {
            begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
        }, {
            begin: "#(c|C)\\(" + r + " +" + r,
            end: "\\)"
        } ]
    }, a = e.inherit(e.QUOTE_STRING_MODE, {
        illegal: null
    }), u = e.COMMENT(";", "$", {
        relevance: 0
    }), l = {
        className: "variable",
        begin: "\\*",
        end: "\\*"
    }, c = {
        className: "keyword",
        begin: "[:&]" + t
    }, p = {
        begin: t,
        relevance: 0
    }, d = {
        begin: n
    }, h = {
        begin: "\\(",
        end: "\\)",
        contains: [ "self", i, a, s, p ]
    }, f = {
        className: "quoted",
        contains: [ s, a, l, c, h, p ],
        variants: [ {
            begin: "['`]\\(",
            end: "\\)"
        }, {
            begin: "\\(quote ",
            end: "\\)",
            keywords: "quote"
        }, {
            begin: "'" + n
        } ]
    }, m = {
        className: "quoted",
        variants: [ {
            begin: "'" + t
        }, {
            begin: "#'" + t + "(::" + t + ")*"
        } ]
    }, g = {
        className: "list",
        begin: "\\(\\s*",
        end: "\\)"
    }, v = {
        endsWithParent: !0,
        relevance: 0
    };
    g.contains = [ {
        className: "keyword",
        variants: [ {
            begin: t
        }, {
            begin: n
        } ]
    }, v ];
    v.contains = [ f, m, g, i, s, a, u, l, c, d, p ];
    return {
        illegal: /\S/,
        contains: [ s, o, i, a, u, f, m, g, p ]
    };
};
