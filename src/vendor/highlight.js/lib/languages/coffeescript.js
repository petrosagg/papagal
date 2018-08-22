module.exports = function(e) {
    var t = {
        keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
        literal: "true false null undefined yes no on off",
        built_in: "npm require console print module global window document"
    }, n = "[A-Za-z$_][0-9A-Za-z$_]*", r = {
        className: "subst",
        begin: /#\{/,
        end: /}/,
        keywords: t
    }, o = [ e.BINARY_NUMBER_MODE, e.inherit(e.C_NUMBER_MODE, {
        starts: {
            end: "(\\s*/)?",
            relevance: 0
        }
    }), {
        className: "string",
        variants: [ {
            begin: /'''/,
            end: /'''/,
            contains: [ e.BACKSLASH_ESCAPE ]
        }, {
            begin: /'/,
            end: /'/,
            contains: [ e.BACKSLASH_ESCAPE ]
        }, {
            begin: /"""/,
            end: /"""/,
            contains: [ e.BACKSLASH_ESCAPE, r ]
        }, {
            begin: /"/,
            end: /"/,
            contains: [ e.BACKSLASH_ESCAPE, r ]
        } ]
    }, {
        className: "regexp",
        variants: [ {
            begin: "///",
            end: "///",
            contains: [ r, e.HASH_COMMENT_MODE ]
        }, {
            begin: "//[gim]*",
            relevance: 0
        }, {
            begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/
        } ]
    }, {
        className: "property",
        begin: "@" + n
    }, {
        begin: "`",
        end: "`",
        excludeBegin: !0,
        excludeEnd: !0,
        subLanguage: "javascript"
    } ];
    r.contains = o;
    var i = e.inherit(e.TITLE_MODE, {
        begin: n
    }), s = "(\\(.*\\))?\\s*\\B[-=]>", a = {
        className: "params",
        begin: "\\([^\\(]",
        returnBegin: !0,
        contains: [ {
            begin: /\(/,
            end: /\)/,
            keywords: t,
            contains: [ "self" ].concat(o)
        } ]
    };
    return {
        aliases: [ "coffee", "cson", "iced" ],
        keywords: t,
        illegal: /\/\*/,
        contains: o.concat([ e.COMMENT("###", "###"), e.HASH_COMMENT_MODE, {
            className: "function",
            begin: "^\\s*" + n + "\\s*=\\s*" + s,
            end: "[-=]>",
            returnBegin: !0,
            contains: [ i, a ]
        }, {
            begin: /[:\(,=]\s*/,
            relevance: 0,
            contains: [ {
                className: "function",
                begin: s,
                end: "[-=]>",
                returnBegin: !0,
                contains: [ a ]
            } ]
        }, {
            className: "class",
            beginKeywords: "class",
            end: "$",
            illegal: /[:="\[\]]/,
            contains: [ {
                beginKeywords: "extends",
                endsWithParent: !0,
                illegal: /[:="\[\]]/,
                contains: [ i ]
            }, i ]
        }, {
            className: "attribute",
            begin: n + ":",
            end: ":",
            returnBegin: !0,
            returnEnd: !0,
            relevance: 0
        } ])
    };
};