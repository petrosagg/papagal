module.exports = function(e) {
    var t = {
        className: "variable",
        begin: /\$\(/,
        end: /\)/,
        contains: [ e.BACKSLASH_ESCAPE ]
    };
    return {
        aliases: [ "mk", "mak" ],
        contains: [ e.HASH_COMMENT_MODE, {
            begin: /^\w+\s*\W*=/,
            returnBegin: true,
            relevance: 0,
            starts: {
                className: "constant",
                end: /\s*\W*=/,
                excludeEnd: true,
                starts: {
                    end: /$/,
                    relevance: 0,
                    contains: [ t ]
                }
            }
        }, {
            className: "title",
            begin: /^[\w]+:\s*$/
        }, {
            className: "phony",
            begin: /^\.PHONY:/,
            end: /$/,
            keywords: ".PHONY",
            lexemes: /[\.\w]+/
        }, {
            begin: /^\t+/,
            end: /$/,
            relevance: 0,
            contains: [ e.QUOTE_STRING_MODE, t ]
        } ]
    };
};
