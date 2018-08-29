module.exports = function(e) {
    var t = {
        keyword: "class deinit enum extension func init let protocol static struct subscript typealias var break case continue default do else fallthrough if in for return switch where while as dynamicType is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ __LINE__ associativity didSet get infix inout left mutating none nonmutating operator override postfix precedence prefix right set unowned unowned safe unsafe weak willSet",
        literal: "true false nil",
        built_in: "abs advance alignof alignofValue assert bridgeFromObjectiveC bridgeFromObjectiveCUnconditional bridgeToObjectiveC bridgeToObjectiveCUnconditional c contains count countElements countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump encodeBitsAsWords enumerate equal filter find getBridgedObjectiveCType getVaList indices insertionSort isBridgedToObjectiveC isBridgedVerbatimToObjectiveC isUniquelyReferenced join lexicographicalCompare map max maxElement min minElement numericCast partition posix print println quickSort reduce reflect reinterpretCast reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof strideofValue swap swift toString transcode underestimateCount unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer withUnsafePointerToObject withUnsafePointers withVaList"
    }, n = {
        className: "type",
        begin: "\\b[A-Z][\\w']*",
        relevance: 0
    }, r = e.COMMENT("/\\*", "\\*/", {
        contains: [ "self" ]
    }), o = {
        className: "subst",
        begin: /\\\(/,
        end: "\\)",
        keywords: t,
        contains: []
    }, i = {
        className: "number",
        begin: "\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b",
        relevance: 0
    }, s = e.inherit(e.QUOTE_STRING_MODE, {
        contains: [ o, e.BACKSLASH_ESCAPE ]
    });
    o.contains = [ i ];
    return {
        keywords: t,
        contains: [ s, e.C_LINE_COMMENT_MODE, r, n, i, {
            className: "func",
            beginKeywords: "func",
            end: "{",
            excludeEnd: true,
            contains: [ e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
                illegal: /\(/
            }), {
                className: "generics",
                begin: /</,
                end: />/,
                illegal: />/
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                endsParent: true,
                keywords: t,
                contains: [ "self", i, s, e.C_BLOCK_COMMENT_MODE, {
                    begin: ":"
                } ],
                illegal: /["']/
            } ],
            illegal: /\[|%/
        }, {
            className: "class",
            beginKeywords: "struct protocol class extension enum",
            keywords: t,
            end: "\\{",
            excludeEnd: true,
            contains: [ e.inherit(e.TITLE_MODE, {
                begin: /[A-Za-z$_][0-9A-Za-z$_]*/
            }) ]
        }, {
            className: "preprocessor",
            begin: "(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|@infix|@prefix|@postfix)"
        }, {
            beginKeywords: "import",
            end: /$/,
            contains: [ e.C_LINE_COMMENT_MODE, r ]
        } ]
    };
};
