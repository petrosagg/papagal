module.exports = function(e) {
    var t = "[A-Za-z0-9\\._:-]+", n = {
        begin: /<\?(php)?(?!\w)/,
        end: /\?>/,
        subLanguage: "php"
    }, r = {
        endsWithParent: true,
        illegal: /</,
        relevance: 0,
        contains: [ n, {
            className: "attribute",
            begin: t,
            relevance: 0
        }, {
            begin: "=",
            relevance: 0,
            contains: [ {
                className: "value",
                contains: [ n ],
                variants: [ {
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /'/,
                    end: /'/
                }, {
                    begin: /[^\s\/>]+/
                } ]
            } ]
        } ]
    };
    return {
        aliases: [ "html", "xhtml", "rss", "atom", "xsl", "plist" ],
        case_insensitive: true,
        contains: [ {
            className: "doctype",
            begin: "<!DOCTYPE",
            end: ">",
            relevance: 10,
            contains: [ {
                begin: "\\[",
                end: "\\]"
            } ]
        }, e.COMMENT("\x3c!--", "--\x3e", {
            relevance: 10
        }), {
            className: "cdata",
            begin: "<\\!\\[CDATA\\[",
            end: "\\]\\]>",
            relevance: 10
        }, {
            className: "tag",
            begin: "<style(?=\\s|>|$)",
            end: ">",
            keywords: {
                title: "style"
            },
            contains: [ r ],
            starts: {
                end: "</style>",
                returnEnd: true,
                subLanguage: "css"
            }
        }, {
            className: "tag",
            begin: "<script(?=\\s|>|$)",
            end: ">",
            keywords: {
                title: "script"
            },
            contains: [ r ],
            starts: {
                end: "<\/script>",
                returnEnd: true,
                subLanguage: [ "actionscript", "javascript", "handlebars" ]
            }
        }, n, {
            className: "pi",
            begin: /<\?\w+/,
            end: /\?>/,
            relevance: 10
        }, {
            className: "tag",
            begin: "</?",
            end: "/?>",
            contains: [ {
                className: "title",
                begin: /[^ \/><\n\t]+/,
                relevance: 0
            }, r ]
        } ]
    };
};
