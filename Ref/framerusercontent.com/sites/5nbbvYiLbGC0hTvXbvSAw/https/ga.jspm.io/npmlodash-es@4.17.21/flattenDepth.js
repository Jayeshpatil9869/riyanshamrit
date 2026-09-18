import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./isArray.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import t from "./toInteger.js";
import "./isArguments.js";
import "./_/7100b469.js";
import {
    b as r
} from "./_/4175b908.js";
/**
 * Recursively flatten `array` up to `depth` times.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @param {number} [depth=1] The maximum recursion depth.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * var array = [1, [2, [3, [4]], 5]];
 *
 * _.flattenDepth(array, 1);
 * // => [1, 2, [3, [4]], 5]
 *
 * _.flattenDepth(array, 2);
 * // => [1, 2, 3, [4], 5]
 */
function flattenDepth(i, o) {
    var s = null == i ? 0 : i.length;
    if (!s) return [];
    o = void 0 === o ? 1 : t(o);
    return r(i, o)
}
export default flattenDepth;

//# sourceMappingURL=flattenDepth.js.map