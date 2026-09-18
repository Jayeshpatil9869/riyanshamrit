import r from "../_arrayMap.js";
import a from "../_copyArray.js";
import e from "../_baseIndexOf.js";
import {
    b as l
} from "./43b5d56d.js";
/**
 * This function is like `baseIndexOf` except that it accepts a comparator.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOfWith(r, a, e, l) {
    var t = e - 1,
        o = r.length;
    while (++t < o)
        if (l(r[t], a)) return t;
    return -1
}
var t = Array.prototype;
var o = t.splice;
/**
 * The base implementation of `_.pullAllBy` without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to remove.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns `array`.
 */
function basePullAll(t, i, n, s) {
    var f = s ? baseIndexOfWith : e,
        p = -1,
        b = i.length,
        m = t;
    t === i && (i = a(i));
    n && (m = r(t, l(n)));
    while (++p < b) {
        var h = 0,
            u = i[p],
            c = n ? n(u) : u;
        while ((h = f(m, c, h, s)) > -1) {
            m !== t && o.call(m, h, 1);
            o.call(t, h, 1)
        }
    }
    return t
}
export {
    basePullAll as b
};

//# sourceMappingURL=26b5fbdd.js.map