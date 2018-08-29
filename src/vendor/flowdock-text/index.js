if (typeof window == "undefined" || window === null) {
    window = {
        FlowdockText: {}
    }
};

if (window.FlowdockText == null) {
    window.FlowdockText = {}
};

if (typeof FlowdockText == "undefined" || FlowdockText === null) {
    FlowdockText = {}
};

(function() {
    function e(e, t) {
        t = t || "";
        if (typeof e != "string") {
            e.global && t.indexOf("g") < 0 && (t += "g"), e.ignoreCase && t.indexOf("i") < 0 && (t += "i"), 
            e.multiline && t.indexOf("m") < 0 && (t += "m"), e = e.source
        };
        return new RegExp(e.replace(/#\{(\w+)\}/g, function(e, t) {
            var n = FlowdockText.regexen[t] || "";
            if (typeof n != "string") {
                n = n.source
            };
            return n;
        }), t);
    }
    function n(e, t) {
        return e.replace(/#\{(\w+)\}/g, function(e, n) {
            return t[n] || "";
        });
    }
    function r(e, t, n) {
        var r = String.fromCharCode(t);
        if (n !== t) {
            r += "-" + String.fromCharCode(n)
        };
        e.push(r);
        return e;
    }
    function o(e) {
        var t = {};
        for (var n in e) {
            if (e.hasOwnProperty(n)) {
                t[n] = e[n]
            };
        }
        return t;
    }
    function i(e, t, n) {
        var r = n + e.index, o = t.slice(0, r), i = t.slice(r + e[0].length);
        return FlowdockText.regexen.startHashTagMatch.test(o) && !FlowdockText.regexen.endHashtagMatch.test(i);
    }
    function s(e, t, n, r, o) {
        if (undefined !== e && (e === null || e.start >= r)) {
            return e;
        }
        var i = t.match(o.regex);
        if (i) {
            if (!o.check(i, n, r)) {
                var a = r + i.index + 1;
                return s(e, n.slice(a), n, a, o);
            }
            return {
                type: o.type,
                match: i,
                start: r + i.index,
                end: r + i.index + i[0].length
            };
        }
        return i;
    }
    function a(e) {
        var t = e.match[0], n = u(t, {
            url: true
        }).filter(function(e) {
            return e.type == "url";
        });
        if (n.length > 0) {
            return n.map(function(t) {
                t.start += e.start;
                return t;
            });
        }
        return [ e ];
    }
    function u(e, t) {
        for (var n = [], r = 0, o = $.filter(function(e) {
            return !t || t[e.type];
        }), i = new Array(o.length); ;) {
            for (var u = e.substr(r), l = 0; l < i.length; l++) {
                i[l] = s(i[l], u, e, r, o[l]);
            }
            for (var c = undefined, p = 0; p < i.length; p++) {
                var d = i[p];
                if (!c || d && d.start < c.start) {
                    c = d
                };
            }
            if (!c) {
                n.push({
                    type: "text",
                    value: u
                });
                return n;
            }
            if (c.start > r) {
                n.push({
                    type: "text",
                    value: u.substr(0, c.start - r)
                })
            };
            if (c.type == "quote") {
                n.push.apply(n, a(c));
            } else {
                n.push(c);
            }
            r = c.end;
        }
    }
    function l(e, t) {
        var r, o, i;
        if (e.urlEntities) {
            for (r = {}, o = 0, i = e.urlEntities.length; i > o; o++) {
                r[e.urlEntities[o].url] = e.urlEntities[o];
            }
        }
        var s = t.match[2], a = t.match[3] || t.match[5], u = "", l = t.match[1], c = "", p = false;
        if (s[0] == "(" && s[s.length - 1] == ")" || s[0] == "[" && s[s.length - 1] == "]") {
            s = s.substr(1, s.length - 2), p = true
        };
        for (var d in e) {
            u += n(' #{k}="#{v}" ', {
                k: d,
                v: e[d].toString().replace(/"/, "&quot;").replace(/</, "&lt;").replace(/>/, "&gt;")
            });
        }
        if (s.match(FlowdockText.regexen.validTcoUrl)) {
            s = RegExp.lastMatch, c = RegExp.rightContext
        };
        var h = {
            htmlAttrs: u,
            url: FlowdockText.htmlEscape(s),
            after: c,
            before: l,
            parenBefore: p ? s[0] : "",
            parenAfter: p ? s[s.length - 1] : ""
        };
        if (r && r[s] && r[s].display_url) {
            h.displayUrl = FlowdockText.htmlEscape(r[s].display_url);
        } else {
            h.displayUrl = h.url;
        }
        a || (h.url = "http://" + h.url);
        return n('#{parenBefore}#{before}<a href="#{url}"#{htmlAttrs}>#{displayUrl}</a>#{after}#{parenAfter}', h);
    }
    function c(e, t) {
        return t.match[0].replace(FlowdockText.regexen.email, function(t) {
            d = {
                subMatch: FlowdockText.htmlEscape(t)
            };
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    d[r] = e[r]
                };
            }
            return n("<a href='mailto:#{subMatch}' class='#{emailClass}'>#{subMatch}</a>", d);
        });
    }
    function p(e, t) {
        var r = t.match, o = r[1], i = r[2], s = {
            hash: FlowdockText.htmlEscape(o),
            preText: "",
            text: FlowdockText.htmlEscape(i),
            postText: ""
        };
        for (var a in e) {
            if (e.hasOwnProperty(a)) {
                s[a] = e[a]
            };
        }
        return n('<a href="#{hashtagUrlBase}#{text}" title="##{text}" class="#{hashtagClass}">#{hash}#{preText}#{text}#{postText}</a>', s);
    }
    function h(e, t) {
        var r = [];
        if (e && e.userTags) {
            r = e.userTags.map(function(e) {
                return e.toLowerCase();
            })
        };
        var o = t.match, i = o[1], s = o[2], a = {
            hash: FlowdockText.htmlEscape(i),
            preText: "",
            text: FlowdockText.htmlEscape(s),
            postText: ""
        };
        for (var u in e) {
            if (e.hasOwnProperty(u)) {
                a[u] = e[u]
            };
        }
        if (r.length === 0 || M(a.hash + a.text.toLowerCase(), r)) {
            return n('<a title="Search #{hash}#{text}" class="#{hashtagClass}" href="#{hashtagUrlBase}#{hash}#{text}">#{hash}#{preText}#{text}#{postText}</a>', a);
        }
        return n("#{hash}#{preText}#{text}#{postText}", a);
    }
    function f(e, t, n) {
        switch (n.type) {
          case "text":
            return n.value;

          case "url":
            return l(t, n);

          case "hash":
            return p(e, n);

          case "mention":
            return h(e, n);

          case "email":
            return c(e, n);
        }
    }
    function m(e) {
        e = o(e || {});
        e.hashtagClass = e.hashtagClass || j;
        e.hashtagUrlBase = e.hashtagUrlBase || "#flowser/all/";
        e.emailClass = e.emailClass || "email-link";
        return e;
    }
    function g(e) {
        return o(e || {});
    }
    function v(e, t) {
        if (t.type === e || t.type === "text") {
            return t;
        }
        return {
            type: "text",
            value: t.match[0]
        };
    }
    function b(e, t, n, r) {
        t = m(t);
        n = g(n);
        var o = u(e);
        if (r) {
            o = o.map(v.bind(null, r))
        };
        var i = o.map(f.bind(null, t, n));
        return i.join("");
    }
    function y(e) {
        return e.email;
    }
    function _(e) {
        e = e.filter(function(e) {
            return e.type == "email";
        });
        var t = [];
        e.forEach(function(e) {
            return e.match[0].replace(FlowdockText.regexen.email, function(n) {
                n = FlowdockText.htmlEscape(n);
                var r = e.end + FlowdockText.regexen.extractEmails.lastIndex, o = r - n.length;
                t.push({
                    email: n,
                    indices: [ o, r ]
                });
            });
        });
        return t;
    }
    function w(e) {
        return e.url;
    }
    function k(e) {
        e = e.filter(function(e) {
            return e.type == "url";
        });
        var t = [];
        e.forEach(function(e) {
            var n = e.match, r = n[1], o = n[2], i = n[3] || n[5], s = n[4] || n[6], a = n[8], u = e.start + r.length, l = e.end;
            if (i) {
                if (o.match(FlowdockText.regexen.validTcoUrl)) {
                    o = RegExp.lastMatch, l = u + o.length
                };
                t.push({
                    url: o,
                    indices: [ u, l ]
                });
            } else {
                var c = null, p = false, d = 0;
                s.replace(FlowdockText.regexen.validAsciiDomain, function(e) {
                    var n = s.indexOf(e, d);
                    d = n + e.length;
                    c = {
                        url: e,
                        indices: [ u + n, u + d ]
                    };
                    t.push(c);
                });
                if (c == null) {
                    return;
                }
                if (a) {
                    p && t.push(c), c.url = o.replace(s, c.url), c.indices[1] = l
                };
            }
        });
        return t;
    }
    function x(e) {
        return e.tag;
    }
    function C(e) {
        e = e.filter(function(e) {
            return e.type == "hash";
        });
        var t = [];
        e.forEach(function(e) {
            var n = e.match, r = (n[1], n[2]), o = e.start, i = e.end;
            t.push({
                tag: r,
                indices: [ o, i ]
            });
        });
        return t;
    }
    function E(e) {
        return e.tag;
    }
    function T(e, t) {
        e = e.filter(function(e) {
            return e.type == "mention";
        });
        var n = [];
        e.forEach(function(e) {
            var t = e.match, r = t[1], o = t[2], i = e.start, s = e.end;
            n.push({
                tag: r + o,
                indices: [ i, s ]
            });
        });
        if (t) {
            t = A(t.map(D));
            return n.filter(function(e) {
                return M(e.tag.toLowerCase(), t);
            });
        }
        return n;
    }
    function S(e, t, n) {
        if (n) {
            return !e || e.match(t) && RegExp["$&"] === e;
        }
        return typeof e == "string" && e.match(t) && RegExp["$&"] === e;
    }
    function D(e) {
        if (typeof e == "string") {
            if (e[0] === "@") {
                return e;
            }
            return "@" + e;
        }
        return "@" + e.nick;
    }
    function A(e) {
        return e.map(function(e) {
            return e.toLowerCase();
        });
    }
    function M(e, t) {
        return -1 !== t.indexOf(e);
    }
    function F(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function N(e) {
        return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    }
    FlowdockText = {};
    FlowdockText.regexen = {};
    var O = {
        "&": "&amp;",
        ">": "&gt;",
        "<": "&lt;",
        '"': "&quot;",
        "'": "&#39;"
    };
    FlowdockText.htmlEscape = function(e) {
        return e && e.replace(/[&"'><]/g, function(e) {
            return O[e];
        });
    };
    var I = String.fromCharCode, P = [ I(32), I(133), I(160), I(5760), I(6158), I(8232), I(8233), I(8239), I(8287), I(12288) ];
    r(P, 9, 13);
    r(P, 8192, 8202);
    var L = [ I(65534), I(65279), I(65535) ];
    r(L, 8234, 8238);
    FlowdockText.regexen.spaces_group = e(P.join(""));
    FlowdockText.regexen.spaces = e("[" + P.join("") + "]");
    FlowdockText.regexen.invalid_chars_group = e(L.join(""));
    FlowdockText.regexen.punct = /\!'#%&'\(\)*\+,\\\-\.\/:;<=>\?@\[\]\^_{|}~\$/;
    FlowdockText.regexen.atSigns = /[@\uff20]/;
    FlowdockText.regexen.extractMentions = e(/(^|[^a-zA-Z0-9_!#$%&*@\uff20])(#{atSigns})([a-zA-Z0-9_]{1,20})/g);
    var R = [];
    r(R, 1024, 1279);
    r(R, 1280, 1319);
    r(R, 11744, 11775);
    r(R, 42560, 42655);
    r(R, 880, 1023);
    r(R, 4352, 4607);
    r(R, 12592, 12677);
    r(R, 43360, 43391);
    r(R, 44032, 55215);
    r(R, 55216, 55295);
    r(R, 65441, 65500);
    r(R, 12449, 12538);
    r(R, 12540, 12542);
    r(R, 65382, 65439);
    r(R, 65392, 65392);
    r(R, 65296, 65305);
    r(R, 65313, 65338);
    r(R, 65345, 65370);
    r(R, 12353, 12438);
    r(R, 12441, 12446);
    r(R, 13312, 19903);
    r(R, 19968, 40959);
    r(R, 12291, 12291);
    r(R, 12293, 12293);
    r(R, 12347, 12347);
    FlowdockText.regexen.nonLatinHashtagChars = e(R.join(""));
    var B = [];
    r(B, 192, 255);
    r(B, 256, 383);
    r(B, 7680, 7935);
    FlowdockText.regexen.latinAccentChars = e(B.join(""));
    FlowdockText.regexen.endScreenNameMatch = e(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/);
    FlowdockText.regexen.hashtagAlpha = e(/[a-z_#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    FlowdockText.regexen.usernameAlphaNumeric = e(/[a-z0-9_\-\.#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    FlowdockText.regexen.usernameAlphaNumericEnd = e(/[a-z0-9_\-#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    FlowdockText.regexen.hashtagAlphaNumeric = e(/[a-z0-9_\-#{latinAccentChars}#{nonLatinHashtagChars}]/i);
    FlowdockText.regexen.endHashtagMatch = /^(?:[#\uff03]|:\/\/)/;
    FlowdockText.regexen.hashtagBoundary = e(/(?:^|$|[^&\/a-z0-9_@\uff20#{latinAccentChars}#{nonLatinHashtagChars}])/);
    FlowdockText.regexen.singleValidHashTag = e(/^#{hashtagAlphaNumeric}+$/i);
    FlowdockText.regexen.autoLinkHashtags = e(/(#{hashtagBoundary})(#|\uff03)(#{hashtagAlphaNumeric}+)/gi);
    FlowdockText.regexen.startHashTagMatch = e(/(?:^|[^&\/a-z0-9_#{latinAccentChars}#{nonLatinHashtagChars}])$/);
    FlowdockText.regexen.singleHashTag = e(/(#|\uff03)(#{hashtagAlphaNumeric}+)/i);
    FlowdockText.regexen.singleMention = e(/(@)(#{usernameAlphaNumeric}*#{usernameAlphaNumericEnd}+)/i);
    FlowdockText.regexen.autoLinkMentions = e(/(#{hashtagBoundary})(@)(#{usernameAlphaNumeric}*#{usernameAlphaNumericEnd}+)/gi);
    FlowdockText.regexen.highlightRegex = function(e) {
        if (e && e.length > 0) {
            return new RegExp("(\\b)" + N(e) + "(\\b)", "i");
        }
        return;
    };
    FlowdockText.regexen.validPrecedingChars = e(/(?:[^-\/"'!=A-Za-z0-9_@\uff20$#\uff03\.#{invalid_chars_group}]|^)[\(\[]?/);
    FlowdockText.regexen.invalidDomainChars = n("#{punct}#{spaces_group}#{invalid_chars_group}", FlowdockText.regexen);
    FlowdockText.regexen.validDomainChars = e(/[^#{invalidDomainChars}]/);
    FlowdockText.regexen.validSubdomain = e(/(?:(?:#{validDomainChars}(?:[_-]|#{validDomainChars})*)?#{validDomainChars}\.)/);
    FlowdockText.regexen.validDomainName = e(/(?:(?:#{validDomainChars}(?:-|#{validDomainChars})*)?#{validDomainChars}\.)/);
    FlowdockText.regexen.validGTLD = e(RegExp("(?:(?:academy|actor|aero|agency|arpa|asia|bar|bargains|berlin|best|bid|bike|biz|blue|boutique|build|builders|buzz|cab|camera|camp|cards|careers|cat|catering|center|ceo|cheap|christmas|cleaning|clothing|club|codes|coffee|com|community|company|computer|construction|contractors|cool|coop|cruises|dance|dating|democrat|diamonds|directory|domains|edu|education|email|enterprises|equipment|estate|events|expert|exposed|farm|fish|flights|florist|foundation|futbol|gallery|gift|glass|gov|graphics|guitars|guru|holdings|holiday|house|immobilien|industries|info|institute|int|international|jobs|kaufen|kim|kitchen|kiwi|koeln|kred|land|lighting|limo|link|luxury|management|mango|marketing|menu|mil|mobi|moda|monash|museum|nagoya|name|net|neustar|ninja|okinawa|onl|org|partners|parts|photo|photography|photos|pics|pink|plumbing|post|pro|productions|properties|pub|qpon|recipes|red|rentals|repair|report|reviews|rich|ruhr|sexy|shiksha|shoes|singles|social|solar|solutions|supplies|supply|support|systems|tattoo|technology|tel|tienda|tips|today|tokyo|tools|training|travel|uno|vacations|ventures|viajes|villas|vision|vote|voting|voto|voyage|wang|watch|wed|wien|wiki|works|local|xxx|xyz|zone|дети|онлайн|орг|сайт|بازار|شبكة|みんな|中信|中文网|公司|公益|在线|我爱你|政务|游戏|移动|网络|集团|삼성)(?=[^0-9a-zA-Z@]|$))"));
    FlowdockText.regexen.validCCTLD = e(RegExp("(?:(?:ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bl|bm|bn|bo|bq|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mf|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw|мон|рф|срб|укр|қаз|الاردن|الجزائر|السعودية|المغرب|امارات|ایران|بھارت|تونس|سودان|سورية|عمان|فلسطين|قطر|مصر|مليسيا|پاکستان|भारत|বাংলা|ভারত|ਭਾਰਤ|ભારત|இந்தியா|இலங்கை|சிங்கப்பூர்|భారత్|ලංකා|ไทย|გე|中国|中國|台湾|台灣|新加坡|香港|한국)(?=[^0-9a-zA-Z@]|$))"));
    FlowdockText.regexen.validPunycode = e(/(?:xn--[0-9a-z]+)/);
    FlowdockText.regexen.validDomain = e(/(?:#{validSubdomain}*#{validDomainName}(?:#{validGTLD}|#{validCCTLD}|#{validPunycode}))/);
    FlowdockText.regexen.pseudoValidIP = e(/(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/);
    FlowdockText.regexen.validAsciiDomain = e(/(?:(?:[a-z0-9#{latinAccentChars}\-]+)\.)+(?:#{validGTLD}|#{validCCTLD}|#{validPunycode})/gi);
    FlowdockText.regexen.validPortNumber = e(/[0-9]+/);
    FlowdockText.regexen.validGeneralUrlPathChars = e(/[a-z0-9!\*';:=\+,\.\$\/%#\[\]\-_~|&#{latinAccentChars}]/i);
    FlowdockText.regexen.validUrlBalancedParens = e(/\(#{validGeneralUrlPathChars}+\)/i);
    FlowdockText.regexen.validUrlPathEndingChars = e(/[\+\-a-z0-9=_#\/#{latinAccentChars}]|(?:#{validUrlBalancedParens})/i);
    FlowdockText.regexen.validUrlPath = e("(?:(?:#{validGeneralUrlPathChars}*(?:#{validUrlBalancedParens}#{validGeneralUrlPathChars}*)*#{validUrlPathEndingChars})|(?:(@|@@)#{validGeneralUrlPathChars}*/?#{validUrlPathEndingChars}+))", "i");
    FlowdockText.regexen.validUrlQueryChars = /[a-z0-9!?\*'\(\);:&=\+\$\/%#\[\]\-_\.,~|]/i;
    FlowdockText.regexen.validUrlQueryEndingChars = /[a-z0-9_&=#\/\)\]]/i;
    FlowdockText.regexen.extractUrl = e("((#{validPrecedingChars})((?:(?:(https?:\\/\\/)?(#{validDomain}|#{pseudoValidIP}))|(?:(https?:\\/\\/)(#{validDomainName}*(?:#{validDomainChars}|-){2,})(?=:|/|#{spaces}|$)))(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?))", "gi");
    FlowdockText.regexen.quoted = e("((^|\\n)\\s{4}.*)", "m");
    FlowdockText.regexen.singleUrl = e("(#{validPrecedingChars})((?:(?:(https?:\\/\\/)?(#{validDomain}|#{pseudoValidIP}))|(?:(https?:\\/\\/)(#{validDomainName}*(?:#{validDomainChars}|-){2,})(?=:|/|#{spaces}|$)))(?::(#{validPortNumber}))?(\\/#{validUrlPath}*)?(\\?#{validUrlQueryChars}*#{validUrlQueryEndingChars})?)", "i");
    FlowdockText.regexen.validTcoUrl = /^https?:\/\/t\.co\/[a-z0-9]+/i;
    FlowdockText.regexen.validateUrlUnreserved = /[a-z0-9\-._~]/i;
    FlowdockText.regexen.validateUrlPctEncoded = /(?:%[0-9a-f]{2})/i;
    FlowdockText.regexen.validateUrlSubDelims = /[!$&'()*+,;=]/i;
    FlowdockText.regexen.validateUrlPchar = e("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|[:|@])", "i");
    FlowdockText.regexen.validateUrlScheme = /(?:[a-z][a-z0-9+\-.]*)/i;
    FlowdockText.regexen.validateUrlUserinfo = e("(?:#{validateUrlUnreserved}|#{validateUrlPctEncoded}|#{validateUrlSubDelims}|:)*", "i");
    FlowdockText.regexen.validateUrlDecOctet = /(?:[0-9]|(?:[1-9][0-9])|(?:1[0-9]{2})|(?:2[0-4][0-9])|(?:25[0-5]))/i;
    FlowdockText.regexen.validateUrlIpv4 = e(/(?:#{validateUrlDecOctet}(?:\.#{validateUrlDecOctet}){3})/i);
    FlowdockText.regexen.validateUrlIpv6 = /(?:\[[a-f0-9:\.]+\])/i;
    FlowdockText.regexen.validateUrlIp = e("(?:#{validateUrlIpv4}|#{validateUrlIpv6})", "i");
    FlowdockText.regexen.validateUrlSubDomainSegment = /(?:[a-z0-9](?:[a-z0-9_\-]*[a-z0-9])?)/i;
    FlowdockText.regexen.validateUrlDomainSegment = /(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?)/i;
    FlowdockText.regexen.validateUrlDomainTld = /(?:[a-z](?:[a-z0-9\-]*[a-z0-9])?)/i;
    FlowdockText.regexen.validateUrlDomain = e(/(?:(?:#{validateUrlSubDomainSegment]}\.)*(?:#{validateUrlDomainSegment]}\.)#{validateUrlDomainTld})/i);
    FlowdockText.regexen.validateUrlHost = e("(?:#{validateUrlIp}|#{validateUrlDomain})", "i");
    FlowdockText.regexen.validateUrlUnicodeSubDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9_\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    FlowdockText.regexen.validateUrlUnicodeDomainSegment = /(?:(?:[a-z0-9]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    FlowdockText.regexen.validateUrlUnicodeDomainTld = /(?:(?:[a-z]|[^\u0000-\u007f])(?:(?:[a-z0-9\-]|[^\u0000-\u007f])*(?:[a-z0-9]|[^\u0000-\u007f]))?)/i;
    FlowdockText.regexen.validateUrlUnicodeDomain = e(/(?:(?:#{validateUrlUnicodeSubDomainSegment}\.)*(?:#{validateUrlUnicodeDomainSegment}\.)#{validateUrlUnicodeDomainTld})/i);
    FlowdockText.regexen.validateUrlUnicodeHost = e("(?:#{validateUrlIp}|#{validateUrlUnicodeDomain})", "i");
    FlowdockText.regexen.validateUrlPort = /[0-9]{1,5}/;
    FlowdockText.regexen.validateUrlUnicodeAuthority = e("(?:(#{validateUrlUserinfo})@)?(#{validateUrlUnicodeHost})(?::(#{validateUrlPort}))?", "i");
    FlowdockText.regexen.validateUrlAuthority = e("(?:(#{validateUrlUserinfo})@)?(#{validateUrlHost})(?::(#{validateUrlPort}))?", "i");
    FlowdockText.regexen.validateUrlPath = e(/(\/#{validateUrlPchar}*)*/i);
    FlowdockText.regexen.validateUrlQuery = e(/(#{validateUrlPchar}|\/|\?)*/i);
    FlowdockText.regexen.validateUrlFragment = e(/(#{validateUrlPchar}|\/|\?)*/i);
    FlowdockText.regexen.validateUrlUnencoded = e("^(?:([^:/?#]+):\\/\\/)?([^/?#]*)([^?#]*)(?:\\?([^#]*))?(?:#(.*))?$", "i");
    FlowdockText.regexen.validEmailLocalPart = e("[A-z|0-9|.|_|%|+|-]+");
    FlowdockText.regexen.email = e(/#{validEmailLocalPart}@#{validDomain}/, "gi");
    FlowdockText.regexen.extractEmails = e(/(?:^|\s|,|"|')?(#{email})/, "gi");
    FlowdockText.regexen.singleEmail = e(/(?:^|\s|,|"|')?(#{email})/, "i");
    var j = "app-tag-link", $ = [ {
        type: "quote",
        regex: FlowdockText.regexen.quoted,
        check: function() {
            return true;
        }
    }, {
        type: "url",
        regex: FlowdockText.regexen.singleUrl,
        check: function() {
            return true;
        }
    }, {
        type: "hash",
        regex: FlowdockText.regexen.singleHashTag,
        check: i
    }, {
        type: "mention",
        regex: FlowdockText.regexen.singleMention,
        check: i
    }, {
        type: "email",
        regex: FlowdockText.regexen.singleEmail,
        check: function() {
            return true;
        }
    } ];
    FlowdockText.autoLink = function(e, t, n) {
        return b(e, t, n);
    };
    FlowdockText.autoLinkHashtags = function(e, t) {
        return b(e, t, {}, "hash");
    };
    FlowdockText.autoLinkEmails = function(e, t) {
        return b(e, t, {}, "email");
    };
    FlowdockText.autoLinkUrlsCustom = function(e, t) {
        return b(e, {}, t, "url");
    };
    FlowdockText.autoLinkMentions = function(e, t) {
        return b(e, t, {}, "mention");
    };
    FlowdockText.extractEmails = function(e) {
        var t = FlowdockText.extractEmailsWithIndices(e);
        return t.map(y);
    };
    FlowdockText.extractEmailsWithIndices = function(e) {
        return FlowdockText.extractAllWithIndices(e).emails;
    };
    FlowdockText.extractUrls = function(e) {
        var t = FlowdockText.extractUrlsWithIndices(e);
        return t.map(w);
    };
    FlowdockText.extractUrlsWithIndices = function(e) {
        return FlowdockText.extractAllWithIndices(e).urls;
    };
    FlowdockText.extractHashtags = function(e) {
        var t = FlowdockText.extractHashtagsWithIndices(e);
        return t.map(x);
    };
    FlowdockText.extractHashtagsWithIndices = function(e) {
        return FlowdockText.extractAllWithIndices(e).hashtags;
    };
    FlowdockText.modifyIndicesFromUnicodeToUTF16 = function(e, t) {
        FlowdockText.shiftIndices(e, t, 1);
    };
    FlowdockText.modifyIndicesFromUTF16ToUnicode = function(e, t) {
        FlowdockText.shiftIndices(e, t, -1);
    };
    FlowdockText.shiftIndices = function(e, t, n) {
        for (var r = 0; r < e.length - 1; r++) {
            var o = e.charCodeAt(r), i = e.charCodeAt(r + 1);
            if (o >= 55296 && o <= 56319 && i >= 56320 && i <= 57343) {
                r++;
                for (var s = 0; s < t.length; s++) {
                    if (t[s].indices[0] >= r) {
                        t[s].indices[0] += n, t[s].indices[1] += n
                    };
                }
            }
        }
    };
    FlowdockText.extractMentions = function(e, t) {
        var n = FlowdockText.extractMentionsWithIndices(e, t);
        return n.map(E);
    };
    FlowdockText.extractMentionsWithIndices = function(e, t) {
        return FlowdockText.extractAllWithIndices(e, t).mentions;
    };
    FlowdockText.extractAllWithIndices = function(e, t) {
        if (!e) {
            return {
                hashtags: [],
                mentions: [],
                emails: [],
                urls: []
            };
        }
        var n = u(e);
        return {
            hashtags: C(n),
            mentions: T(n, t),
            emails: _(n),
            urls: k(n)
        };
    };
    FlowdockText.extractAll = function(e, t) {
        var n = FlowdockText.extractAllWithIndices(e, t);
        return {
            hashtags: n.hashtags.map(x),
            mentions: n.mentions.map(E),
            emails: n.emails.map(y),
            urls: n.urls.map(w)
        };
    };
    FlowdockText.mentionsTags = function(e, t) {
        if (F(e)) {
            if (F(t)) {
                return t.some(function(t) {
                    return -1 !== A(e).indexOf(t);
                });
            }
            return -1 !== A(e).indexOf(t);
        }
        return FlowdockText.mentionsTags(FlowdockText.extractMentions(e), t);
    };
    FlowdockText.mentionsUser = function(e, t) {
        if (F(e)) {
            return -1 !== A(e).indexOf(D(t).toLowerCase());
        }
        return FlowdockText.extractMentions(e, [ D(t) ]).length > 0;
    };
    FlowdockText.isValidUrl = function(e, t, n) {
        if (t == null) {
            t = true
        };
        if (n == null) {
            n = true
        };
        if (!e) {
            return false;
        }
        var r = e.match(FlowdockText.regexen.validateUrlUnencoded);
        if (!r || r[0] !== e) {
            return false;
        }
        var o = r[1], i = r[2], s = r[3], a = r[4], u = r[5];
        if ((!n || S(o, FlowdockText.regexen.validateUrlScheme) && o.match(/^https?$/i)) && S(s, FlowdockText.regexen.validateUrlPath) && S(a, FlowdockText.regexen.validateUrlQuery, true) && S(u, FlowdockText.regexen.validateUrlFragment, true)) {
            return t && S(i, FlowdockText.regexen.validateUrlUnicodeAuthority) || !t && S(i, FlowdockText.regexen.validateUrlAuthority);
        }
        return false;
    };
    if (typeof module != "undefined" && module.exports) {
        module.exports = FlowdockText
    };
})();
