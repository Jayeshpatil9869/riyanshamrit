import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import t from "./toInteger.js";
import {
    b as r
} from "./_/b225817a.js";
import {
    b as i
} from "./_/e10cd6f2.js";
/**
 * A specialized version of `_.lastIndexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictLastIndexOf(t, r, i) {
    var o = i + 1;
    while (o--)
        if (t[o] === r) return o;
    return o
}
var o = Math.max,
    s = Math.min;
/**
 * This method is like `_.indexOf` except that it iterates over elements of
 * `array` from right to left.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.lastIndexOf([1, 2, 1, 2], 2);
 * // => 3
 *
 * // Search from the `fromIndex`.
 * _.lastIndexOf([1, 2, 1, 2], 2, 2);
 * // => 1
 */
function lastIndexOf(e, a, f) {
    var m = null == e ? 0 : e.length;
    if (!m) return -1;
    var n = m;
    if (void 0 !== f) {
        n = t(f);
        n = n < 0 ? o(m + n, 0) : s(n, m - 1)
    }
    return a === a ? strictLastIndexOf(e, a, n) : r(e, i, n, true)
}
export default lastIndexOf;

//# sourceMappingURL=lastIndexOf.js.map