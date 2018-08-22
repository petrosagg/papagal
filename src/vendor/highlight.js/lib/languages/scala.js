module.exports = function(e) {
    var t = {
        className: "annotation",
        begin: "@[A-Za-z]+"
    }, n = {
        className: "string",
        begin: 'u?r?"""',
        end: '"""',
        relevance: 10
    }, r = {
        className: "symbol",
        begin: "'\\w[\\w\\d_]*(?!')"
    }, o = {
        className: "type",
        begin: "\\b[A-Z][A-Za-z0-9_]*",
        relevance: 0
    }, i = {
        className: "title",
        begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
        relevance: 0
    }, s = {
        className: "class",
        beginKeywords: "class object trait type",
        end: /[:={\[(\n;]/,
        contains: [ {
            className: "keyword",
            beginKeywords: "extends with",
            relevance: 10
        }, i ]
    }, a = {
        className: "function",
        beginKeywords: "def val",
        end: /[:={\[(\n;]/,
        contains: [ i ]
    };
    return {
        keywords: {
            literal: "true false null",
            keyword: "type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit"
        },
        contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, n, e.QUOTE_STRING_MODE, r, o, a, s, e.C_NUMBER_MODE, t ]
    };
};