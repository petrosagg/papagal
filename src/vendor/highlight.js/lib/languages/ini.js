module.exports = function(e) {
    var t = {
        className: "string",
        contains: [ e.BACKSLASH_ESCAPE ],
        variants: [ {
            begin: "'''",
            end: "'''",
            relevance: 10
        }, {
            begin: '"""',
            end: '"""',
            relevance: 10
        }, {
            begin: '"',
            end: '"'
        }, {
            begin: "'",
            end: "'"
        } ]
    };
    return {
        aliases: [ "toml" ],
        case_insensitive: !0,
        illegal: /\S/,
        contains: [ e.COMMENT(";", "$"), e.HASH_COMMENT_MODE, {
            className: "title",
            begin: /^\s*\[+/,
            end: /\]+/
        }, {
            className: "setting",
            begin: /^[a-z0-9\[\]_-]+\s*=\s*/,
            end: "$",
            contains: [ {
                className: "value",
                endsWithParent: !0,
                keywords: "on off true false yes no",
                contains: [ {
                    className: "variable",
                    variants: [ {
                        begin: /\$[\w\d"][\w\d_]*/
                    }, {
                        begin: /\$\{(.*?)}/
                    } ]
                }, t, {
                    className: "number",
                    begin: /([\+\-]+)?[\d]+_[\d_]+/
                }, e.NUMBER_MODE ],
                relevance: 0
            } ]
        } ]
    };
};
