module.exports = function(e) {
    return {
        aliases: [ "js" ],
        keywords: {
            keyword: "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await",
            literal: "true false null undefined NaN Infinity",
            built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"
        },
        contains: [ {
            className: "pi",
            relevance: 10,
            begin: /^\s*['"]use (strict|asm)['"]/
        }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
            className: "string",
            begin: "`",
            end: "`",
            contains: [ e.BACKSLASH_ESCAPE, {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}"
            } ]
        }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
            className: "number",
            variants: [ {
                begin: "\\b(0[bB][01]+)"
            }, {
                begin: "\\b(0[oO][0-7]+)"
            }, {
                begin: e.C_NUMBER_RE
            } ],
            relevance: 0
        }, {
            begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
            keywords: "return throw case",
            contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.REGEXP_MODE, {
                begin: /</,
                end: />\s*[);\]]/,
                relevance: 0,
                subLanguage: "xml"
            } ],
            relevance: 0
        }, {
            className: "function",
            beginKeywords: "function",
            end: /\{/,
            excludeEnd: true,
            contains: [ e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/
            }), {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: true,
                excludeEnd: true,
                contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
            } ],
            illegal: /\[|%/
        }, {
            begin: /\$[(.]/
        }, {
            begin: "\\." + e.IDENT_RE,
            relevance: 0
        }, {
            beginKeywords: "import",
            end: "[;$]",
            keywords: "import from as",
            contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE ]
        }, {
            className: "class",
            beginKeywords: "class",
            end: /[{;=]/,
            excludeEnd: true,
            illegal: /[:"\[\]]/,
            contains: [ {
                beginKeywords: "extends"
            }, e.UNDERSCORE_TITLE_MODE ]
        } ],
        illegal: /#/
    };
};
