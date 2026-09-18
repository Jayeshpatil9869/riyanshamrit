import {
    b as e
} from "./_/b225817a.js";
import {
    b as r
} from "./_/e10cd6f2.js";
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(e, r, t) {
    var n = t - 1,
        f = e.length;
    while (++n < f)
        if (e[n] === r) return n;
    return -1
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(t, n, f) {
    return n === n ? strictIndexOf(t, n, f) : e(t, r, f)
}
export default baseIndexOf;

//# sourceMappingURL=_baseIndexOf.js.map