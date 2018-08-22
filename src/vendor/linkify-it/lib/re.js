"use strict";

var r = exports.src_Any = require("uc.micro/properties/Any/regex").source, o = exports.src_Cc = require("uc.micro/categories/Cc/regex").source, i = exports.src_Z = require("uc.micro/categories/Z/regex").source, s = exports.src_P = require("uc.micro/categories/P/regex").source, a = exports.src_ZPCc = [ i, s, o ].join("|"), u = exports.src_ZCc = [ i, o ].join("|"), l = "(?:(?!" + a + ")" + r + ")", c = "(?:(?![0-9]|" + a + ")" + r + ")", p = exports.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";

exports.src_auth = "(?:(?:(?!" + u + ").)+@)?";

var d = exports.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", h = exports.src_host_terminator = "(?=$|" + a + ")(?!-|_|:\\d|\\.-|\\.(?!$|" + a + "))", f = exports.src_path = "(?:[/?#](?:(?!" + u + "|[()[\\]{}.,\"'?!\\-]).|\\[(?:(?!" + u + "|\\]).)*\\]|\\((?:(?!" + u + "|[)]).)*\\)|\\{(?:(?!" + u + '|[}]).)*\\}|\\"(?:(?!' + u + '|["]).)+\\"|\\\'(?:(?!' + u + "|[']).)+\\'|\\'(?=" + l + ").|\\.{2,3}[a-zA-Z0-9%/]|\\.(?!" + u + "|[.]).|\\-(?!--(?:[^-]|$))(?:-*)|\\,(?!" + u + ").|\\!(?!" + u + "|[!]).|\\?(?!" + u + "|[?]).)+|\\/)?", m = exports.src_email_name = '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+', g = exports.src_xn = "xn--[a-z0-9\\-]{1,59}", v = exports.src_domain_root = "(?:" + g + "|" + c + "{1,63})", b = exports.src_domain = "(?:" + g + "|(?:" + l + ")|(?:" + l + "(?:-(?!-)|" + l + "){0,61}" + l + "))", y = exports.src_host = "(?:" + p + "|(?:(?:(?:" + b + ")\\.)*" + v + "))", _ = exports.tpl_host_fuzzy = "(?:" + p + "|(?:(?:(?:" + b + ")\\.)+(?:%TLDS%)))", w = exports.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + b + ")\\.)+(?:%TLDS%))";

exports.src_host_strict = y + h;

var k = exports.tpl_host_fuzzy_strict = _ + h;

exports.src_host_port_strict = y + d + h;

var x = exports.tpl_host_port_fuzzy_strict = _ + d + h, C = exports.tpl_host_port_no_ip_fuzzy_strict = w + d + h;

exports.tpl_host_fuzzy_test = "localhost|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + a + "|$))";

exports.tpl_email_fuzzy = "(^|>|" + u + ")(" + m + "@" + k + ")";

exports.tpl_link_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + x + f + ")";

exports.tpl_link_no_ip_fuzzy = "(^|(?![.:/\\-_@])(?:[$+<=>^`|]|" + a + "))((?![$+<=>^`|])" + C + f + ")";