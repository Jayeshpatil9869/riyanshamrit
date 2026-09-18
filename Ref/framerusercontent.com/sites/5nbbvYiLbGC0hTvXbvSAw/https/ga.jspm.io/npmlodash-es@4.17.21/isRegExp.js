import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import s from "./isObjectLike.js";
import {
    b as e
} from "./_/43b5d56d.js";
import {
    n as o
} from "./_/17fb905d.js";
var a = "[object RegExp]";
/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(e) {
    return s(e) && r(e) == a
}
var f = o && o.isRegExp;
/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var t = f ? e(f) : baseIsRegExp;
export default t;

//# sourceMappingURL=isRegExp.js.map