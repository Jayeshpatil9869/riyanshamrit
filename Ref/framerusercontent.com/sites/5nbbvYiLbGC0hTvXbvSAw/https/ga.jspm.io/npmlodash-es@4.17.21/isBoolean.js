import "./_/f08a6ffe.js";
import {
    b as o
} from "./_/9bf895a3.js";
import e from "./isObjectLike.js";
var r = "[object Boolean]";
/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(t) {
    return true === t || false === t || e(t) && o(t) == r
}
export default isBoolean;

//# sourceMappingURL=isBoolean.js.map