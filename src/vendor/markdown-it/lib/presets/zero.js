"use strict";

module.exports = {
    options: {
        html: false,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkify: false,
        typographer: false,
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
