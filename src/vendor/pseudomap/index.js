(function(n) {
    if (n.env.npm_package_name === "pseudomap" && n.env.npm_lifecycle_script === "test") {
        n.env.TEST_PSEUDOMAP = "true"
    };
    if (typeof Map != "function" || n.env.TEST_PSEUDOMAP) {
        module.exports = require("./pseudomap");
    } else {
        module.exports = Map;
    }
}).call(this, require("_process"));
