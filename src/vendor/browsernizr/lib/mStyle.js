var r = require("./Modernizr"), o = require("./modElem"), i = {
    style: o.elem.style
};

r._q.unshift(function() {
    delete i.style;
});

module.exports = i;
