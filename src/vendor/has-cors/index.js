var r = require("global");

try {
    module.exports = "XMLHttpRequest" in r && "withCredentials" in new r.XMLHttpRequest();
} catch (o) {
    module.exports = !1;
}
