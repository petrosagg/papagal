module.exports = function(e) {
    return {
        case_insensitive: true,
        contains: [ {
            className: "doctype",
            begin: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
            relevance: 10
        }, e.COMMENT("^\\s*(!=#|=#|-#|/).*$", false, {
            relevance: 0
        }), {
            begin: "^\\s*(-|=|!=)(?!#)",
            starts: {
                end: "\\n",
                subLanguage: "ruby"
            }
        }, {
            className: "tag",
            begin: "^\\s*%",
            contains: [ {
                className: "title",
                begin: "\\w+"
            }, {
                className: "value",
                begin: "[#\\.][\\w-]+"
            }, {
                begin: "{\\s*",
                end: "\\s*}",
                excludeEnd: true,
                contains: [ {
                    begin: ":\\w+\\s*=>",
                    end: ",\\s+",
                    returnBegin: true,
                    endsWithParent: true,
                    contains: [ {
                        className: "symbol",
                        begin: ":\\w+"
                    }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                        begin: "\\w+",
                        relevance: 0
                    } ]
                } ]
            }, {
                begin: "\\(\\s*",
                end: "\\s*\\)",
                excludeEnd: true,
                contains: [ {
                    begin: "\\w+\\s*=",
                    end: "\\s+",
                    returnBegin: true,
                    endsWithParent: true,
                    contains: [ {
                        className: "attribute",
                        begin: "\\w+",
                        relevance: 0
                    }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                        begin: "\\w+",
                        relevance: 0
                    } ]
                } ]
            } ]
        }, {
            className: "bullet",
            begin: "^\\s*[=~]\\s*",
            relevance: 0
        }, {
            begin: "#{",
            starts: {
                end: "}",
                subLanguage: "ruby"
            }
        } ]
    };
};
