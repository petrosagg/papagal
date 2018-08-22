(function(n) {
    if (n.env.npm_package_name === "pseudomap" && n.env.npm_lifecycle_script === "test") {
        n.env.TEST_PSEUDOMAP = "true"
    };
    typeof Map != "function" || n.env.TEST_PSEUDOMAP ? module.exports = require("./pseudomap") : module.exports = Map;
}).call(this, require("_process"));
