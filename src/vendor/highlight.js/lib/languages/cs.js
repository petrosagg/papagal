module.exports = function(e) {
    var t = "abstract as base bool break byte case catch char checked const continue decimal dynamic default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long null when object operator out override params private protected public readonly ref sbyte sealed short sizeof stackalloc static string struct switch this true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async protected public private internal ascending descending from get group into join let orderby partial select set value var where yield", n = e.IDENT_RE + "(<" + e.IDENT_RE + ">)?";
    return {
        aliases: [ "csharp" ],
        keywords: t,
        illegal: /::/,
        contains: [ e.COMMENT("///", "$", {
            returnBegin: true,
            contains: [ {
                className: "xmlDocTag",
                variants: [ {
                    begin: "///",
                    relevance: 0
                }, {
                    begin: "\x3c!--|--\x3e"
                }, {
                    begin: "</?",
                    end: ">"
                } ]
            } ]
        }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
            className: "preprocessor",
            begin: "#",
            end: "$",
            keywords: "if else elif endif define undef warning error line region endregion pragma checksum"
        }, {
            className: "string",
            begin: '@"',
            end: '"',
            contains: [ {
                begin: '""'
            } ]
        }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, {
            beginKeywords: "class interface",
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [ e.TITLE_MODE, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
        }, {
            beginKeywords: "namespace",
            end: /[{;=]/,
            illegal: /[^\s:]/,
            contains: [ {
                className: "title",
                begin: "[a-zA-Z](\\.?\\w)*",
                relevance: 0
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
        }, {
            beginKeywords: "new return throw await",
            relevance: 0
        }, {
            className: "function",
            begin: "(" + n + "\\s+)+" + e.IDENT_RE + "\\s*\\(",
            returnBegin: true,
            end: /[{;=]/,
            excludeEnd: true,
            keywords: t,
            contains: [ {
                begin: e.IDENT_RE + "\\s*\\(",
                returnBegin: true,
                contains: [ e.TITLE_MODE ],
                relevance: 0
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                keywords: t,
                relevance: 0,
                contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE ]
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
        } ]
    };
};
