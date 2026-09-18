import "./eq.js";
import {
    b as t
} from "./_/deff5480.js";
/**
 * This method is like `_.uniq` except that it's designed and optimized
 * for sorted arrays.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.sortedUniq([1, 1, 2]);
 * // => [1, 2]
 */
function sortedUniq(e) {
    return e && e.length ? t(e) : []
}
export default sortedUniq;

//# sourceMappingURL=sortedUniq.js.map