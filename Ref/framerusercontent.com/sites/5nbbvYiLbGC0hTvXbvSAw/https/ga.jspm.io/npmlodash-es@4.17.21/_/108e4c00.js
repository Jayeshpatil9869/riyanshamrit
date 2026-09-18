import r from "../isSymbol.js";
import e from "../identity.js";
import {
    b as t
} from "./1ca5f0b1.js";
var o = 4294967295,
    n = o >>> 1;
/**
 * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
 * performs a binary search of `array` to determine the index at which `value`
 * should be inserted into `array` in order to maintain its sort order.
 *
 * @private
 * @param {Array} array The sorted array to inspect.
 * @param {*} value The value to evaluate.
 * @param {boolean} [retHighest] Specify returning the highest qualified index.
 * @returns {number} Returns the index at which `value` should be inserted
 *  into `array`.
 */
function baseSortedIndex(o, i, a) {
    var m = 0,
        s = null == o ? m : o.length;
    if ("number" == typeof i && i === i && s <= n) {
        while (m < s) {
            var b = m + s >>> 1,
                f = o[b];
            null !== f && !r(f) && (a ? f <= i : f < i) ? m = b + 1 : s = b
        }
        return s
    }
    return t(o, i, e, a)
}
export {
    baseSortedIndex as b
};

//# sourceMappingURL=108e4c00.js.map