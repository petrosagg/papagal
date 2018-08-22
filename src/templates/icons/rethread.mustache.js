var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='fa-stack'>");
        r.b("\n" + n);
        r.b('  <svg class="icon-container" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">');
        r.b("\n" + n);
        r.b('    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">');
        r.b("\n" + n);
        r.b("      <g>");
        r.b("\n" + n);
        r.b('        <g transform="translate(10.482051, 9.495191) rotate(-330.000000) translate(-10.482051, -9.495191) translate(8.482051, 1.995191)">');
        r.b("\n" + n);
        r.b('          <g transform="translate(0.685270, 0.024197)"></g>');
        r.b("\n" + n);
        r.b("        </g>");
        r.b("\n" + n);
        r.b('        <g transform="translate(2.500000, 3.000000)">');
        r.b("\n" + n);
        r.b('          <path d="M9.0904541,3.7098999 C9.0904541,3.7098999 8.82010359,4.44099898 9.29977889,4.58934493 C9.77945418,4.73769087 10.4640855,3.34648604 10.4640855,3.34648604 C10.4640855,3.34648604 11.1791124,2.04304976 10.7623643,1.84941573 C10.3456163,1.65578169 9.74182129,2.49810791 9.74182129,2.49810791 C9.74182129,2.49810791 9.08977522,2.35888593 8.94915771,2.434021 C9.74849264,1.07636956 10.3146831,0.596359447 11.224599,1.12169967 C12.2744792,1.72784827 11.7487852,2.71322189 10.7623643,4.42175293 C9.70038736,6.26115101 4.97635244,13.5456517 4.30089561,13.1556765 C3.62543877,12.7657014 7.53135936,5.413963 8.44055176,3.7098999 C8.86230469,3.64074707 9.0904541,3.7098999 9.0904541,3.7098999 Z"></path>');
        r.b("\n" + n);
        r.b('          <path d="M0.859999895,1.30297734 C0.859999895,1.30297734 4.40138632,0.683470811 5.64039939,2.48343949 C6.88035682,4.28340816 4.9321221,7.16090268 3.64589055,6.00499415 C3.19731494,5.60174828 3.42868552,4.58371773 4.22478919,4.09170111 C6.26273903,2.83380065 11.3037846,2.37861445 13.1075307,4.75559302 C15.6157767,8.06088702 10.6285602,10.7466745 9.62469521,11.1300886" stroke="#777777" stroke-width="0.7" style="fill:  none;"></path>');
        r.b("\n" + n);
        r.b("        </g>");
        r.b("\n" + n);
        r.b("      </g>");
        r.b("\n" + n);
        r.b("    </g>");
        r.b("\n" + n);
        r.b("  </svg>");
        r.b("\n" + n);
        r.b("</span>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<span class=\'fa-stack\'>\n  <svg class="icon-container" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n      <g>\n        <g transform="translate(10.482051, 9.495191) rotate(-330.000000) translate(-10.482051, -9.495191) translate(8.482051, 1.995191)">\n          <g transform="translate(0.685270, 0.024197)"></g>\n        </g>\n        <g transform="translate(2.500000, 3.000000)">\n          <path d="M9.0904541,3.7098999 C9.0904541,3.7098999 8.82010359,4.44099898 9.29977889,4.58934493 C9.77945418,4.73769087 10.4640855,3.34648604 10.4640855,3.34648604 C10.4640855,3.34648604 11.1791124,2.04304976 10.7623643,1.84941573 C10.3456163,1.65578169 9.74182129,2.49810791 9.74182129,2.49810791 C9.74182129,2.49810791 9.08977522,2.35888593 8.94915771,2.434021 C9.74849264,1.07636956 10.3146831,0.596359447 11.224599,1.12169967 C12.2744792,1.72784827 11.7487852,2.71322189 10.7623643,4.42175293 C9.70038736,6.26115101 4.97635244,13.5456517 4.30089561,13.1556765 C3.62543877,12.7657014 7.53135936,5.413963 8.44055176,3.7098999 C8.86230469,3.64074707 9.0904541,3.7098999 9.0904541,3.7098999 Z"></path>\n          <path d="M0.859999895,1.30297734 C0.859999895,1.30297734 4.40138632,0.683470811 5.64039939,2.48343949 C6.88035682,4.28340816 4.9321221,7.16090268 3.64589055,6.00499415 C3.19731494,5.60174828 3.42868552,4.58371773 4.22478919,4.09170111 C6.26273903,2.83380065 11.3037846,2.37861445 13.1075307,4.75559302 C15.6157767,8.06088702 10.6285602,10.7466745 9.62469521,11.1300886" stroke="#777777" stroke-width="0.7" style="fill:  none;"></path>\n        </g>\n      </g>\n    </g>\n  </svg>\n</span>', r);