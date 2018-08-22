module.exports = function(e) {
    var t = {
        className: "keyword",
        begin: "\\b[a-z\\d_]*_t\\b"
    }, n = {
        className: "string",
        variants: [ e.inherit(e.QUOTE_STRING_MODE, {
            begin: '((u8?|U)|L)?"'
        }), {
            begin: '(u8?|U)?R"',
            end: '"',
            contains: [ e.BACKSLASH_ESCAPE ]
        }, {
            begin: "'\\\\?.",
            end: "'",
            illegal: "."
        } ]
    }, r = {
        className: "number",
        variants: [ {
            begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"
        }, {
            begin: e.C_NUMBER_RE
        } ]
    }, o = {
        className: "preprocessor",
        begin: "#",
        end: "$",
        keywords: "if else elif endif define undef warning error line pragma ifdef ifndef",
        contains: [ {
            begin: /\\\n/,
            relevance: 0
        }, {
            beginKeywords: "include",
            end: "$",
            contains: [ n, {
                className: "string",
                begin: "<",
                end: ">",
                illegal: "\\n"
            } ]
        }, n, r, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
    }, i = e.IDENT_RE + "\\s*\\(", s = {
        keyword: "int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignof constexpr decltype noexcept static_assert thread_local restrict _Bool complex _Complex _Imaginary atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong",
        built_in: "std string cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf",
        literal: "true false nullptr NULL"
    };
    return {
        aliases: [ "c", "cc", "h", "c++", "h++", "hpp" ],
        keywords: s,
        illegal: "</",
        contains: [ t, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, r, n, o, {
            begin: "\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
            end: ">",
            keywords: s,
            contains: [ "self", t ]
        }, {
            begin: e.IDENT_RE + "::",
            keywords: s
        }, {
            beginKeywords: "new throw return else",
            relevance: 0
        }, {
            className: "function",
            begin: "(" + e.IDENT_RE + "[\\*&\\s]+)+" + i,
            returnBegin: !0,
            end: /[{;=]/,
            excludeEnd: !0,
            keywords: s,
            illegal: /[^\w\s\*&]/,
            contains: [ {
                begin: i,
                returnBegin: !0,
                contains: [ e.TITLE_MODE ],
                relevance: 0
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: s,
                relevance: 0,
                contains: [ e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, n, r ]
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, o ]
        } ]
    };
};