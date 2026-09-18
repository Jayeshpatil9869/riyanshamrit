import "./_/f08a6ffe.js";
import {
    b as t
} from "./_/9bf895a3.js";
import o from "./isObject.js";
var n = "[object AsyncFunction]",
    r = "[object Function]",
    e = "[object GeneratorFunction]",
    i = "[object Proxy]";
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(c) {
    if (!o(c)) return false;
    var f = t(c);
    return f == r || f == e || f == n || f == i
}
export default isFunction;

//# sourceMappingURL=isFunction.js.map