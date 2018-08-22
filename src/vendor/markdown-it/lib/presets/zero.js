"use strict";

module.exports = {
    options: {
        html: !1,
        xhtmlOut: !1,
        breaks: !1,
        langPrefix: "language-",
        linkify: !1,
        typographer: !1,
        quotes: "“”‘’",
        highlight: null,
        maxNesting: 20
    },
    components: {
        core: {
            rules: [ "normalize", "block", "inline" ]
        },
        block: {
            rules: [ "paragraph" ]
        },
        inline: {
            rules: [ "text" ]
        }
    }
};
