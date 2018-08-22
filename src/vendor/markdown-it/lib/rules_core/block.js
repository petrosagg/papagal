"use strict";

module.exports = function(e) {
    var t;
    e.inlineMode ? (t = new e.Token("inline", "", 0), t.content = e.src, t.map = [ 0, 1 ], 
    t.children = [], e.tokens.push(t)) : e.md.block.parse(e.src, e.md, e.env, e.tokens);
};