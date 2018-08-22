module.exports = function(e) {
    var t = [ e.COMMENT("--", "$"), e.COMMENT("{-", "-}", {
        contains: [ "self" ]
    }) ], n = {
        className: "pragma",
        begin: "{-#",
        end: "#-}"
    }, r = {
        className: "preprocessor",
        begin: "^#",
        end: "$"
    }, o = {
        className: "type",
        begin: "\\b[A-Z][\\w']*",
        relevance: 0
    }, i = {
        className: "container",
        begin: "\\(",
        end: "\\)",
        illegal: '"',
        contains: [ n, r, {
            className: "type",
            begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
        }, e.inherit(e.TITLE_MODE, {
            begin: "[_a-z][\\w']*"
        }) ].concat(t)
    }, s = {
        className: "container",
        begin: "{",
        end: "}",
        contains: i.contains
    };
    return {
        aliases: [ "hs" ],
        keywords: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
        contains: [ {
            className: "module",
            begin: "\\bmodule\\b",
            end: "where",
            keywords: "module where",
            contains: [ i ].concat(t),
            illegal: "\\W\\.|;"
        }, {
            className: "import",
            begin: "\\bimport\\b",
            end: "$",
            keywords: "import|0 qualified as hiding",
            contains: [ i ].concat(t),
            illegal: "\\W\\.|;"
        }, {
            className: "class",
            begin: "^(\\s*)?(class|instance)\\b",
            end: "where",
            keywords: "class family instance where",
            contains: [ o, i ].concat(t)
        }, {
            className: "typedef",
            begin: "\\b(data|(new)?type)\\b",
            end: "$",
            keywords: "data family type newtype deriving",
            contains: [ n, o, i, s ].concat(t)
        }, {
            className: "default",
            beginKeywords: "default",
            end: "$",
            contains: [ o, i ].concat(t)
        }, {
            className: "infix",
            beginKeywords: "infix infixl infixr",
            end: "$",
            contains: [ e.C_NUMBER_MODE ].concat(t)
        }, {
            className: "foreign",
            begin: "\\bforeign\\b",
            end: "$",
            keywords: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
            contains: [ o, e.QUOTE_STRING_MODE ].concat(t)
        }, {
            className: "shebang",
            begin: "#!\\/usr\\/bin\\/env runhaskell",
            end: "$"
        }, n, r, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, o, e.inherit(e.TITLE_MODE, {
            begin: "^[_a-z][\\w']*"
        }), {
            begin: "->|<-"
        } ].concat(t)
    };
};