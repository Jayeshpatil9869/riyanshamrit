import r from "../_arrayMap.js";
import {
    a as t
} from "./ef6cf5be.js";
import {
    b as a
} from "./43b5d56d.js";
import {
    S as e,
    c as i
} from "./9b3b36d6.js";
import s from "../isArrayLikeObject.js";
import {
    a as n
} from "./3d95c57d.js";
var o = Math.min;
/**
 * The base implementation of methods like `_.intersection`, without support
 * for iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of shared values.
 */
function baseIntersection(s, c, f) {
    var m = f ? n : t,
        b = s[0].length,
        h = s.length,
        p = h,
        j = Array(h),
        l = Infinity,
        u = [];
    while (p--) {
        var v = s[p];
        p && c && (v = r(v, a(c)));
        l = o(v.length, l);
        j[p] = !f && (c || b >= 120 && v.length >= 120) ? new e(p && v) : void 0
    }
    v = s[0];
    var d = -1,
        y = j[0];
    r: while (++d < b && u.length < l) {
        var g = v[d],
            w = c ? c(g) : g;
        g = f || 0 !== g ? g : 0;
        if (!(y ? i(y, w) : m(u, w, f))) {
            p = h;
            while (--p) {
                var A = j[p];
                if (!(A ? i(A, w) : m(s[p], w, f))) continue r
            }
            y && y.push(w);
            u.push(g)
        }
    }
    return u
}
/**
 * Casts `value` to an empty array if it's not an array like object.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array|Object} Returns the cast array-like object.
 */
function castArrayLikeObject(r) {
    return s(r) ? r : []
}
export {
    baseIntersection as b, castArrayLikeObject as c
};

//# sourceMappingURL=85b0a0e9.js.map