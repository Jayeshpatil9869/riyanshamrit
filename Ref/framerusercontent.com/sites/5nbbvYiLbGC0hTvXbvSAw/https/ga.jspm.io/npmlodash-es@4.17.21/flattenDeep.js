import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isArguments.js";
import "./_/7100b469.js";
import {
    b as t
} from "./_/4175b908.js";
var r = 1 / 0;
/**
 * Recursively flattens `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flattenDeep([1, [2, [3, [4]], 5]]);
 * // => [1, 2, 3, 4, 5]
 */
function flattenDeep(e) {
    var i = null == e ? 0 : e.length;
    return i ? t(e, r) : []
}
export default flattenDeep;

//# sourceMappingURL=flattenDeep.js.map