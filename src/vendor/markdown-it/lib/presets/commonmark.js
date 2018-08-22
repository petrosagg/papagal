"use strict";

module.exports = {
    options: {
        html: !0,
        xhtmlOut: !0,
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
            rules: [ "blockquote", "code", "fence", "heading", "hr", "html_block", "lheading", "list", "reference", "paragraph" ]
        },
        inline: {
            rules: [ "autolink", "backticks", "emphasis", "entity", "escape", "html_inline", "image", "link", "newline", "text" ]
        }
    }
};
