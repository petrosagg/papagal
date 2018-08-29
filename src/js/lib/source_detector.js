var r, o;

o = function(e, t) {
    if (e) {
        return e.length * t;
    }
    return 0;
};

r = {
    punctuation: function(e) {
        return o(e.match(/[\[\]\.\(\);=`]/g), 1);
    },
    camelCase: function(e) {
        return o(e.match(/(?:\b[A-Z]?[a-z]+[A-Z][a-z]+\b)/g), 2) + o(e.match(/(?:\b[A-Z]?(?:[a-z]+)(?:[A-Z][a-z]+){2,}\b)/g), 10);
    },
    snakeCase: function(e) {
        return o(e.match(/(?:\b(?:[a-z]+_[a-z])+)/g), 5);
    },
    indentation: function(e) {
        return o(e.match(/^(  |\t)+[^\s\d-#\*]/gm), 20);
    },
    score: function(e) {
        return r.punctuation(e) + r.indentation(e) + r.snakeCase(e) + r.camelCase(e);
    },
    detect: function(e) {
        if (e.length > 8096) {
            return false;
        }
        return r.score(e) / e.length > .1;
    }
};

window.SourceDetector = r;
