import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./identity.js";
import t from "./eq.js";
import "./_/1ca5f0b1.js";
import {
    b as r
} from "./_/108e4c00.js";
/**
 * This method is like `_.lastIndexOf` except that it performs a binary
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
 * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
 * // => 3
 */
function sortedLastIndexOf(e, i) {
    var o = null == e ? 0 : e.length;
    if (o) {
        var s = r(e, i, true) - 1;
        if (t(e[s], i)) return s
    }
    return -1
}
export default sortedLastIndexOf;

//# sourceMappingURL=sortedLastIndexOf.js.map