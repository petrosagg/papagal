var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<svg enable-background='new 0 0 50 50' id='Layer_1' version='1.1' viewBox='0 0 50 50' xml:space='preserve' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>");
        r.b("\n" + n);
        r.b("  <path d='M36.796,13.204c3.019,3.019,4.886,7.19,4.886,11.796c0,9.214-7.469,16.684-16.682,16.684S8.318,34.214,8.318,25&#x000A;\tc0-4.606,1.867-8.777,4.886-11.796L7.322,7.323C2.798,11.847,0,18.097,0,25c0,13.807,11.192,25,25,25c13.807,0,25-11.193,25-25&#x000A;\tc0-6.903-2.798-13.153-7.323-17.677L36.796,13.204z'>");
        r.b("\n" + n);
        r.b("</svg>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<svg enable-background='new 0 0 50 50' id='Layer_1' version='1.1' viewBox='0 0 50 50' xml:space='preserve' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg'>\n  <path d='M36.796,13.204c3.019,3.019,4.886,7.19,4.886,11.796c0,9.214-7.469,16.684-16.682,16.684S8.318,34.214,8.318,25&#x000A;\tc0-4.606,1.867-8.777,4.886-11.796L7.322,7.323C2.798,11.847,0,18.097,0,25c0,13.807,11.192,25,25,25c13.807,0,25-11.193,25-25&#x000A;\tc0-6.903-2.798-13.153-7.323-17.677L36.796,13.204z'>\n</svg>\n", r);