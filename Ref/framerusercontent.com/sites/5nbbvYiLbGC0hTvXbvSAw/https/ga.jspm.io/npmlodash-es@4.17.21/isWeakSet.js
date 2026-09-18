import "./_/f08a6ffe.js";
import {
    b as e
} from "./_/9bf895a3.js";
import t from "./isObjectLike.js";
var r = "[object WeakSet]";
/**
 * Checks if `value` is classified as a `WeakSet` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
 * @example
 *
 * _.isWeakSet(new WeakSet);
 * // => true
 *
 * _.isWeakSet(new Set);
 * // => false
 */
function isWeakSet(a) {
    return t(a) && e(a) == r
}
export default isWeakSet;

//# sourceMappingURL=isWeakSet.js.map