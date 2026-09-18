import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import t from "./identity.js";
import {
    b as i
} from "./_/60f3bb4b.js";
import {
    b as o
} from "./_/72bf1878.js";
/**
 * Computes the maximum value of `array`. If `array` is empty or falsey,
 * `undefined` is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {*} Returns the maximum value.
 * @example
 *
 * _.max([4, 2, 8, 6]);
 * // => 8
 *
 * _.max([]);
 * // => undefined
 */
function max(m) {
    return m && m.length ? o(m, t, i) : void 0
}
export default max;

//# sourceMappingURL=max.js.map