var r;

r = $('meta[name="csrf-token"]').attr("content");

$.ajaxSetup({
    dataType: "json",
    headers: {
        "X-CSRF-Token": r
    }
});
