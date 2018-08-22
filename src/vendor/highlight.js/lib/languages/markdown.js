module.exports = function(e) {
    return {
        aliases: [ "md", "mkdown", "mkd" ],
        contains: [ {
            className: "header",
            variants: [ {
                begin: "^#{1,6}",
                end: "$"
            }, {
                begin: "^.+?\\n[=-]{2,}$"
            } ]
        }, {
            begin: "<",
            end: ">",
            subLanguage: "xml",
            relevance: 0
        }, {
            className: "bullet",
            begin: "^([*+-]|(\\d+\\.))\\s+"
        }, {
            className: "strong",
            begin: "[*_]{2}.+?[*_]{2}"
        }, {
            className: "emphasis",
            variants: [ {
                begin: "\\*.+?\\*"
            }, {
                begin: "_.+?_",
                relevance: 0
            } ]
        }, {
            className: "blockquote",
            begin: "^>\\s+",
            end: "$"
        }, {
            className: "code",
            variants: [ {
                begin: "`.+?`"
            }, {
                begin: "^( {4}|\t)",
                end: "$",
                relevance: 0
            } ]
        }, {
            className: "horizontal_rule",
            begin: "^[-\\*]{3,}",
            end: "$"
        }, {
            begin: "\\[.+?\\][\\(\\[].*?[\\)\\]]",
            returnBegin: !0,
            contains: [ {
                className: "link_label",
                begin: "\\[",
                end: "\\]",
                excludeBegin: !0,
                returnEnd: !0,
                relevance: 0
            }, {
                className: "link_url",
                begin: "\\]\\(",
                end: "\\)",
                excludeBegin: !0,
                excludeEnd: !0
            }, {
                className: "link_reference",
                begin: "\\]\\[",
                end: "\\]",
                excludeBegin: !0,
                excludeEnd: !0
            } ],
            relevance: 10
        }, {
            begin: "^\\[.+\\]:",
            returnBegin: !0,
            contains: [ {
                className: "link_reference",
                begin: "\\[",
                end: "\\]:",
                excludeBegin: !0,
                excludeEnd: !0,
                starts: {
                    className: "link_url",
                    end: "$"
                }
            } ]
        } ]
    };
};