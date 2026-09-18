import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import i from "./identity.js";
import {
    b as t
} from "./_/635961f9.js";
import {
    b as o
} from "./_/72bf1878.js";
/**
 * Computes the minimum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * _.min([4, 2, 8, 6]);
 * // => 2
 *
 * _.min([]);
 * // => undefined
 */
function min(m) {
    return m && m.length ? o(m, i, t) : void 0
}
export default min;

//# sourceMappingURL=min.js.map