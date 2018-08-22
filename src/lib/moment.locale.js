moment.locale("en-12h", {
    longDateFormat: {
        LT: "h:mm A",
        L: "MMM D",
        LL: "MMM D, YYYY",
        LLL: "MMMM D, YYYY LT",
        LLLL: "dddd, MMMM D YYYY LT"
    }
});

moment.locale("en-24h", {
    longDateFormat: {
        LT: "H:mm",
        L: "MMM D",
        LL: "MMM D, YYYY",
        LLL: "MMMM D, YYYY LT",
        LLLL: "dddd, MMMM D YYYY LT"
    }
});

moment.locale(window.locale || "en-24h");