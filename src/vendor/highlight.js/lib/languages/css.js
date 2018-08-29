module.exports = function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*", n = {
        className: "function",
        begin: t + "\\(",
        returnBegin: true,
        excludeEnd: true,
        end: "\\("
    }, r = {
        className: "rule",
        begin: /[A-Z\_\.\-]+\s*:/,
        returnBegin: true,
        end: ";",
        endsWithParent: true,
        contains: [ {
            className: "attribute",
            begin: /\S/,
            end: ":",
            excludeEnd: true,
            starts: {
                className: "value",
                endsWithParent: true,
                excludeEnd: true,
                contains: [ n, e.CSS_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, e.C_BLOCK_COMMENT_MODE, {
                    className: "hexcolor",
                    begin: "#[0-9A-Fa-f]+"
                }, {
                    className: "important",
                    begin: "!important"
                } ]
            }
        } ]
    };
    return {
        case_insensitive: true,
        illegal: /[=\/|'\$]/,
        contains: [ e.C_BLOCK_COMMENT_MODE, r, {
            className: "id",
            begin: /\#[A-Za-z0-9_-]+/
        }, {
            className: "class",
            begin: /\.[A-Za-z0-9_-]+/
        }, {
            className: "attr_selector",
            begin: /\[/,
            end: /\]/,
            illegal: "$"
        }, {
            className: "pseudo",
            begin: /:(:)?[a-zA-Z0-9\_\-\+\(\)"']+/
        }, {
            className: "at_rule",
            begin: "@(font-face|page)",
            lexemes: "[a-z-]+",
            keywords: "font-face page"
        }, {
            className: "at_rule",
            begin: "@",
            end: "[{;]",
            contains: [ {
                className: "keyword",
                begin: /\S+/
            }, {
                begin: /\s/,
                endsWithParent: true,
                excludeEnd: true,
                relevance: 0,
                contains: [ n, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.CSS_NUMBER_MODE ]
            } ]
        }, {
            className: "tag",
            begin: t,
            relevance: 0
        }, {
            className: "rules",
            begin: "{",
            end: "}",
            illegal: /\S/,
            contains: [ e.C_BLOCK_COMMENT_MODE, r ]
        } ]
    };
};
