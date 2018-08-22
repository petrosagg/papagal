module.exports = function(e) {
    var t = {
        className: "prompt",
        begin: /^(>>>|\.\.\.) /
    }, n = {
        className: "string",
        contains: [ e.BACKSLASH_ESCAPE ],
        variants: [ {
            begin: /(u|b)?r?'''/,
            end: /'''/,
            contains: [ t ],
            relevance: 10
        }, {
            begin: /(u|b)?r?"""/,
            end: /"""/,
            contains: [ t ],
            relevance: 10
        }, {
            begin: /(u|r|ur)'/,
            end: /'/,
            relevance: 10
        }, {
            begin: /(u|r|ur)"/,
            end: /"/,
            relevance: 10
        }, {
            begin: /(b|br)'/,
            end: /'/
        }, {
            begin: /(b|br)"/,
            end: /"/
        }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
    }, r = {
        className: "number",
        relevance: 0,
        variants: [ {
            begin: e.BINARY_NUMBER_RE + "[lLjJ]?"
        }, {
            begin: "\\b(0o[0-7]+)[lLjJ]?"
        }, {
            begin: e.C_NUMBER_RE + "[lLjJ]?"
        } ]
    }, o = {
        className: "params",
        begin: /\(/,
        end: /\)/,
        contains: [ "self", t, r, n ]
    };
    return {
        aliases: [ "py", "gyp" ],
        keywords: {
            keyword: "and elif is global as in if from raise for except finally print import pass return exec else break not with class assert yield try while continue del or def lambda async await nonlocal|10 None True False",
            built_in: "Ellipsis NotImplemented"
        },
        illegal: /(<\/|->|\?)/,
        contains: [ t, r, n, e.HASH_COMMENT_MODE, {
            variants: [ {
                className: "function",
                beginKeywords: "def",
                relevance: 10
            }, {
                className: "class",
                beginKeywords: "class"
            } ],
            end: /:/,
            illegal: /[${=;\n,]/,
            contains: [ e.UNDERSCORE_TITLE_MODE, o ]
        }, {
            className: "decorator",
            begin: /^[\t ]*@/,
            end: /$/
        }, {
            begin: /\b(print|exec)\(/
        } ]
    };
};