module.exports = function(e) {
    var t = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?", n = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor", r = {
        className: "doctag",
        begin: "@[A-Za-z]+"
    }, o = {
        className: "value",
        begin: "#<",
        end: ">"
    }, i = [ e.COMMENT("#", "$", {
        contains: [ r ]
    }), e.COMMENT("^\\=begin", "^\\=end", {
        contains: [ r ],
        relevance: 10
    }), e.COMMENT("^__END__", "\\n$") ], s = {
        className: "subst",
        begin: "#\\{",
        end: "}",
        keywords: n
    }, a = {
        className: "string",
        contains: [ e.BACKSLASH_ESCAPE, s ],
        variants: [ {
            begin: /'/,
            end: /'/
        }, {
            begin: /"/,
            end: /"/
        }, {
            begin: /`/,
            end: /`/
        }, {
            begin: "%[qQwWx]?\\(",
            end: "\\)"
        }, {
            begin: "%[qQwWx]?\\[",
            end: "\\]"
        }, {
            begin: "%[qQwWx]?{",
            end: "}"
        }, {
            begin: "%[qQwWx]?<",
            end: ">"
        }, {
            begin: "%[qQwWx]?/",
            end: "/"
        }, {
            begin: "%[qQwWx]?%",
            end: "%"
        }, {
            begin: "%[qQwWx]?-",
            end: "-"
        }, {
            begin: "%[qQwWx]?\\|",
            end: "\\|"
        }, {
            begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
        } ]
    }, u = {
        className: "params",
        begin: "\\(",
        end: "\\)",
        keywords: n
    }, l = [ a, o, {
        className: "class",
        beginKeywords: "class module",
        end: "$|;",
        illegal: /=/,
        contains: [ e.inherit(e.TITLE_MODE, {
            begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
        }), {
            className: "inheritance",
            begin: "<\\s*",
            contains: [ {
                className: "parent",
                begin: "(" + e.IDENT_RE + "::)?" + e.IDENT_RE
            } ]
        } ].concat(i)
    }, {
        className: "function",
        beginKeywords: "def",
        end: "$|;",
        contains: [ e.inherit(e.TITLE_MODE, {
            begin: t
        }), u ].concat(i)
    }, {
        className: "constant",
        begin: "(::)?(\\b[A-Z]\\w*(::)?)+",
        relevance: 0
    }, {
        className: "symbol",
        begin: e.UNDERSCORE_IDENT_RE + "(\\!|\\?)?:",
        relevance: 0
    }, {
        className: "symbol",
        begin: ":",
        contains: [ a, {
            begin: t
        } ],
        relevance: 0
    }, {
        className: "number",
        begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        relevance: 0
    }, {
        className: "variable",
        begin: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
    }, {
        begin: "(" + e.RE_STARTERS_RE + ")\\s*",
        contains: [ o, {
            className: "regexp",
            contains: [ e.BACKSLASH_ESCAPE, s ],
            illegal: /\n/,
            variants: [ {
                begin: "/",
                end: "/[a-z]*"
            }, {
                begin: "%r{",
                end: "}[a-z]*"
            }, {
                begin: "%r\\(",
                end: "\\)[a-z]*"
            }, {
                begin: "%r!",
                end: "![a-z]*"
            }, {
                begin: "%r\\[",
                end: "\\][a-z]*"
            } ]
        } ].concat(i),
        relevance: 0
    } ].concat(i);
    s.contains = l;
    u.contains = l;
    var c = "[>?]>", p = "[\\w#]+\\(\\w+\\):\\d+:\\d+>", d = "(\\w+-)?\\d+\\.\\d+\\.\\d(p\\d+)?[^>]+>", h = [ {
        begin: /^\s*=>/,
        className: "status",
        starts: {
            end: "$",
            contains: l
        }
    }, {
        className: "prompt",
        begin: "^(" + c + "|" + p + "|" + d + ")",
        starts: {
            end: "$",
            contains: l
        }
    } ];
    return {
        aliases: [ "rb", "gemspec", "podspec", "thor", "irb" ],
        keywords: n,
        contains: i.concat(h).concat(l)
    };
};