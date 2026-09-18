import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./identity.js";
import r from "./eq.js";
import "./_/1ca5f0b1.js";
import {
    b as t
} from "./_/108e4c00.js";
/**
 * This method is like `_.indexOf` except that it performs a binary
 * search on a sorted `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * @example
 *
 * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
 * // => 1
 */
function sortedIndexOf(i, e) {
    var o = null == i ? 0 : i.length;
    if (o) {
        var f = t(i, e);
        if (f < o && r(i[f], e)) return f
    }
    return -1
}
export default sortedIndexOf;

//# sourceMappingURL=sortedIndexOf.js.map