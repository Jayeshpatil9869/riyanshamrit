import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import i from "./toInteger.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i as r
} from "./_/196bc89c.js";
import {
    b as t
} from "./_/1d34989e.js";
var o = Math.ceil,
    s = Math.max;
/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * _.chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * _.chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(m, e, j) {
    e = (j ? r(m, e, j) : void 0 === e) ? 1 : s(i(e), 0);
    var p = null == m ? 0 : m.length;
    if (!p || e < 1) return [];
    var a = 0,
        n = 0,
        f = Array(o(p / e));
    while (a < p) f[n++] = t(m, a, a += e);
    return f
}
export default chunk;

//# sourceMappingURL=chunk.js.map