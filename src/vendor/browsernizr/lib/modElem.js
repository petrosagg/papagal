var r = require("./Modernizr"), o = require("./createElement"), i = {
    elem: o("modernizr")
};

r._q.push(function() {
    delete i.elem;
});

module.exports = i;
