import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import t from "./isObjectLike.js";
import i from "./isArray.js";
var o = "[object String]";
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(f) {
    return "string" == typeof f || !i(f) && t(f) && r(f) == o
}
export default isString;

//# sourceMappingURL=isString.js.map