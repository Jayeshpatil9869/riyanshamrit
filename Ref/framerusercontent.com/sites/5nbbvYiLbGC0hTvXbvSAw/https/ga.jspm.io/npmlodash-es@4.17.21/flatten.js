import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isArguments.js";
import "./_/7100b469.js";
import {
    b as t
} from "./_/4175b908.js";
/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(r) {
    var i = null == r ? 0 : r.length;
    return i ? t(r, 1) : []
}
export default flatten;

//# sourceMappingURL=flatten.js.map