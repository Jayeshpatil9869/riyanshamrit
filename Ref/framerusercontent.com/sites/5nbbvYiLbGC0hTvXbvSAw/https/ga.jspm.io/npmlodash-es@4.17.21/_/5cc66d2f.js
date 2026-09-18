import {
    r
} from "./f08a6ffe.js";
import {
    b as e
} from "./9bf895a3.js";
import {
    t as a
} from "./ccff797b.js";
import {
    g as t
} from "./e9d6e250.js";
import {
    W as o
} from "./a68c036e.js";
import {
    M as s
} from "./72487e58.js";
import {
    S as c
} from "./573cd97d.js";
var f = t(r, "DataView");
var m = t(r, "Promise");
var i = "[object Map]",
    j = "[object Object]",
    n = "[object Promise]",
    b = "[object Set]",
    p = "[object WeakMap]";
var v = "[object DataView]";
var u = a(f),
    w = a(s),
    d = a(m),
    M = a(c),
    g = a(o);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var D = e;
(f && D(new f(new ArrayBuffer(1))) != v || s && D(new s) != i || m && D(m.resolve()) != n || c && D(new c) != b || o && D(new o) != p) && (D = function(r) {
    var t = e(r),
        o = t == j ? r.constructor : void 0,
        s = o ? a(o) : "";
    if (s) switch (s) {
        case u:
            return v;
        case w:
            return i;
        case d:
            return n;
        case M:
            return b;
        case g:
            return p
    }
    return t
});
var P = D;
export {
    P as g
};

//# sourceMappingURL=5cc66d2f.js.map