"use strict";

var r = global.src_Any = require("uc.micro/properties/Any/regex").source, o = global.src_Cc = require("uc.micro/categories/Cc/regex").source, i = global.src_Z = require("uc.micro/categories/Z/regex").source, s = global.src_P = require("uc.micro/categories/P/regex").source, a = global.src_ZPCc = [ i, s, o ].join("|"), u = global.src_ZCc = [ i, o ].join("|"), l = "(?:(?!" + a + ")" + r + ")", c = "(?:(?![0-9]|" + a + ")" + r + ")", p = global.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

global.src_auth = "(?:(?:(?!" + u + ").)+@)?";

var d = global.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", h = global.src_host_terminator = "(?=$|" + a + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + a + "))", f = global.src_path = "(?:[/?#](?:(?!" + u + "|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + u + "|\\]).)*\\]|\\((?:(?!" + u + "|[)]).)*\\)|\\{(?:(?!" + u + '|[}]).)*\\}|\\"(?:(?!' + u + '|["]).)+\\"|\\\'(?:(?!' + u + "|[']).)+\\'|\\'(?=" + l + ").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + u + "|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!" + u + ").|\\!(?!" + u + "|[!]).|\\?(?!" + u + "|[?]).)+|\\/)?", m = global.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', g = global.src_xn = "xn--[a-z0-9\\-]{1,59}", v = global.src_domain_root = "(?:" + g + "|" + c + "{1,63})", b = global.src_domain = "(?:" + g + "|(?:" + l + ")|(?:" + l + "(?:-(?!-)|" + l + "){0,61}" + l + "))", y = global.src_host = "(?:" + p + "|(?:(?:(?:" + b + ")\\.)*" + v + "))", _ = global.tpl_host_fuzzy = "(?:" + p + "|(?:(?:(?:" + b + ")\\.)+(?:%TLDS%)))", w = global.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + b + ")\\.)+(?:%TLDS%))";

global.src_host_strict = y + h;

var k = global.tpl_host_fuzzy_strict = _ + h;

global.src_host_port_strict = y + d + h;

var x = global.tpl_host_port_fuzzy_strict = _ + d + h, C = global.tpl_host_port_no_ip_fuzzy_strict = w + d + h;

global.tpl_host_fuzzy_test = "localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + a + "|$))";

global.tpl_email_fuzzy = "(^|>|" + u + ")(" + m + "@" + k + ")";

global.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + x + f + ")";

global.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + C + f + ")";