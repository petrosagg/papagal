function r(e) {
    i(!!s);
    d.hasOwnProperty(e) || (e = "*");
    a.hasOwnProperty(e) || (e === "*" ? s.innerHTML = "<link />" : s.innerHTML = "<" + e + "></" + e + ">", 
    a[e] = !s.firstChild);
    if (a[e]) {
        return d[e];
    }
    return null;
}

var o = require("./ExecutionEnvironment"), i = require("./invariant"), s = o.canUseDOM ? document.createElement("div") : null, a = {
    circle: !0,
    clipPath: !0,
    defs: !0,
    ellipse: !0,
    g: !0,
    line: !0,
    linearGradient: !0,
    path: !0,
    polygon: !0,
    polyline: !0,
    radialGradient: !0,
    rect: !0,
    stop: !0,
    text: !0
}, u = [ 1, '<select multiple="true">', "</select>" ], l = [ 1, "<table>", "</table>" ], c = [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ], p = [ 1, "<svg>", "</svg>" ], d = {
    "*": [ 1, "?<div>", "</div>" ],
    area: [ 1, "<map>", "</map>" ],
    col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
    legend: [ 1, "<fieldset>", "</fieldset>" ],
    param: [ 1, "<object>", "</object>" ],
    tr: [ 2, "<table><tbody>", "</tbody></table>" ],
    optgroup: u,
    option: u,
    caption: l,
    colgroup: l,
    tbody: l,
    tfoot: l,
    thead: l,
    td: c,
    th: c,
    circle: p,
    clipPath: p,
    defs: p,
    ellipse: p,
    g: p,
    line: p,
    linearGradient: p,
    path: p,
    polygon: p,
    polyline: p,
    radialGradient: p,
    rect: p,
    stop: p,
    text: p
};

module.exports = r;
