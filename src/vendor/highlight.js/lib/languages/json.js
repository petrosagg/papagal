module.exports = function(e) {
    var t = {
        literal: "true false null"
    }, n = [ e.QUOTE_STRING_MODE, e.C_NUMBER_MODE ], r = {
        className: "value",
        end: ",",
        endsWithParent: true,
        excludeEnd: true,
        contains: n,
        keywords: t
    }, o = {
        begin: "{",
        end: "}",
        contains: [ {
            className: "attribute",
            begin: '\\s*"',
            end: '"\\s*:\\s*',
            excludeBegin: true,
            excludeEnd: true,
            contains: [ e.BACKSLASH_ESCAPE ],
            illegal: "\\n",
            starts: r
        } ],
        illegal: "\\S"
    }, i = {
        begin: "\\[",
        end: "\\]",
        contains: [ e.inherit(r, {
            className: null
        }) ],
        illegal: "\\S"
    };
    n.splice(n.length, 0, o, i);
    return {
        contains: n,
        keywords: t,
        illegal: "\\S"
    };
};
