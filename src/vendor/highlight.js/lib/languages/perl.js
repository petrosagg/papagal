module.exports = function(e) {
    var t = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when", n = {
        className: "subst",
        begin: "[$@]\\{",
        end: "\\}",
        keywords: t
    }, r = {
        begin: "->{",
        end: "}"
    }, o = {
        className: "variable",
        variants: [ {
            begin: /\$\d/
        }, {
            begin: /[\$%@](\^\w\b|#\w+(::\w+)*|{\w+}|\w+(::\w*)*)/
        }, {
            begin: /[\$%@][^\s\w{]/,
            relevance: 0
        } ]
    }, i = [ e.BACKSLASH_ESCAPE, n, o ], s = [ o, e.HASH_COMMENT_MODE, e.COMMENT("^\\=\\w", "\\=cut", {
        endsWithParent: !0
    }), r, {
        className: "string",
        contains: i,
        variants: [ {
            begin: "q[qwxr]?\\s*\\(",
            end: "\\)",
            relevance: 5
        }, {
            begin: "q[qwxr]?\\s*\\[",
            end: "\\]",
            relevance: 5
        }, {
            begin: "q[qwxr]?\\s*\\{",
            end: "\\}",
            relevance: 5
        }, {
            begin: "q[qwxr]?\\s*\\|",
            end: "\\|",
            relevance: 5
        }, {
            begin: "q[qwxr]?\\s*\\<",
            end: "\\>",
            relevance: 5
        }, {
            begin: "qw\\s+q",
            end: "q",
            relevance: 5
        }, {
            begin: "'",
            end: "'",
            contains: [ e.BACKSLASH_ESCAPE ]
        }, {
            begin: '"',
            end: '"'
        }, {
            begin: "`",
            end: "`",
            contains: [ e.BACKSLASH_ESCAPE ]
        }, {
            begin: "{\\w+}",
            contains: [],
            relevance: 0
        }, {
            begin: "-?\\w+\\s*\\=\\>",
            contains: [],
            relevance: 0
        } ]
    }, {
        className: "number",
        begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
        relevance: 0
    }, {
        begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
        keywords: "split return print reverse grep",
        relevance: 0,
        contains: [ e.HASH_COMMENT_MODE, {
            className: "regexp",
            begin: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
            relevance: 10
        }, {
            className: "regexp",
            begin: "(m|qr)?/",
            end: "/[a-z]*",
            contains: [ e.BACKSLASH_ESCAPE ],
            relevance: 0
        } ]
    }, {
        className: "sub",
        beginKeywords: "sub",
        end: "(\\s*\\(.*?\\))?[;{]",
        relevance: 5
    }, {
        className: "operator",
        begin: "-\\w\\b",
        relevance: 0
    }, {
        begin: "^__DATA__$",
        end: "^__END__$",
        subLanguage: "mojolicious",
        contains: [ {
            begin: "^@@.*",
            end: "$",
            className: "comment"
        } ]
    } ];
    n.contains = s;
    r.contains = s;
    return {
        aliases: [ "pl" ],
        keywords: t,
        contains: s
    };
};