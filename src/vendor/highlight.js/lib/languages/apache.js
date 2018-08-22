module.exports = function(e) {
    var t = {
        className: "number",
        begin: "[\\$%]\\d+"
    };
    return {
        aliases: [ "apacheconf" ],
        case_insensitive: !0,
        contains: [ e.HASH_COMMENT_MODE, {
            className: "tag",
            begin: "</?",
            end: ">"
        }, {
            className: "keyword",
            begin: /\w+/,
            relevance: 0,
            keywords: {
                common: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
            },
            starts: {
                end: /$/,
                relevance: 0,
                keywords: {
                    literal: "on off all"
                },
                contains: [ {
                    className: "sqbracket",
                    begin: "\\s\\[",
                    end: "\\]$"
                }, {
                    className: "cbracket",
                    begin: "[\\$%]\\{",
                    end: "\\}",
                    contains: [ "self", t ]
                }, t, e.QUOTE_STRING_MODE ]
            }
        } ],
        illegal: /\S/
    };
};
