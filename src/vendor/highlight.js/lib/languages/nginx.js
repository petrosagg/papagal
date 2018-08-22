module.exports = function(e) {
    var t = {
        className: "variable",
        variants: [ {
            begin: /\$\d+/
        }, {
            begin: /\$\{/,
            end: /}/
        }, {
            begin: "[\\$\\@]" + e.UNDERSCORE_IDENT_RE
        } ]
    }, n = {
        endsWithParent: !0,
        lexemes: "[a-z/_]+",
        keywords: {
            built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
        },
        relevance: 0,
        illegal: "=>",
        contains: [ e.HASH_COMMENT_MODE, {
            className: "string",
            contains: [ e.BACKSLASH_ESCAPE, t ],
            variants: [ {
                begin: /"/,
                end: /"/
            }, {
                begin: /'/,
                end: /'/
            } ]
        }, {
            className: "url",
            begin: "([a-z]+):/",
            end: "\\s",
            endsWithParent: !0,
            excludeEnd: !0,
            contains: [ t ]
        }, {
            className: "regexp",
            contains: [ e.BACKSLASH_ESCAPE, t ],
            variants: [ {
                begin: "\\s\\^",
                end: "\\s|{|;",
                returnEnd: !0
            }, {
                begin: "~\\*?\\s+",
                end: "\\s|{|;",
                returnEnd: !0
            }, {
                begin: "\\*(\\.[a-z\\-]+)+"
            }, {
                begin: "([a-z\\-]+\\.)+\\*"
            } ]
        }, {
            className: "number",
            begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
        }, {
            className: "number",
            begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
            relevance: 0
        }, t ]
    };
    return {
        aliases: [ "nginxconf" ],
        contains: [ e.HASH_COMMENT_MODE, {
            begin: e.UNDERSCORE_IDENT_RE + "\\s",
            end: ";|{",
            returnBegin: !0,
            contains: [ {
                className: "title",
                begin: e.UNDERSCORE_IDENT_RE,
                starts: n
            } ],
            relevance: 0
        } ],
        illegal: "[^\\s\\}]"
    };
};
