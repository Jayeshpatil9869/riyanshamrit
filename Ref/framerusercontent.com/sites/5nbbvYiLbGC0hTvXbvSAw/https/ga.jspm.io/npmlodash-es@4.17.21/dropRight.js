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
} from "./_/1d34989e.js";
/**
 * Creates a slice of `array` with `n` elements dropped from the end.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {number} [n=1] The number of elements to drop.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * _.dropRight([1, 2, 3]);
 * // => [1, 2]
 *
 * _.dropRight([1, 2, 3], 2);
 * // => [1]
 *
 * _.dropRight([1, 2, 3], 5);
 * // => []
 *
 * _.dropRight([1, 2, 3], 0);
 * // => [1, 2, 3]
 */
function dropRight(i, o, m) {
    var s = null == i ? 0 : i.length;
    if (!s) return [];
    o = m || void 0 === o ? 1 : t(o);
    o = s - o;
    return r(i, 0, o < 0 ? 0 : o)
}
export default dropRight;

//# sourceMappingURL=dropRight.js.map