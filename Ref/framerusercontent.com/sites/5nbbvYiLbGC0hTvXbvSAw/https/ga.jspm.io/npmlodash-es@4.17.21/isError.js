import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import e from "./isObjectLike.js";
import "./_/7953e050.js";
import "./_/e52eecc0.js";
import t from "./isPlainObject.js";
var o = "[object DOMException]",
    i = "[object Error]";
/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(s) {
    if (!e(s)) return false;
    var f = r(s);
    return f == i || f == o || "string" == typeof s.message && "string" == typeof s.name && !t(s)
}
export default isError;

//# sourceMappingURL=isError.js.map