import "./_/f08a6ffe.js";
import {
    b as a
} from "./_/9bf895a3.js";
import r from "./isObjectLike.js";
import {
    b as t
} from "./_/43b5d56d.js";
import {
    n as s
} from "./_/17fb905d.js";
var e = "[object Date]";
/**
 * The base implementation of `_.isDate` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 */
function baseIsDate(t) {
    return r(t) && a(t) == e
}
var o = s && s.isDate;
/**
 * Checks if `value` is classified as a `Date` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
 * @example
 *
 * _.isDate(new Date);
 * // => true
 *
 * _.isDate('Mon April 23 2012');
 * // => false
 */
var f = o ? t(o) : baseIsDate;
export default f;

//# sourceMappingURL=isDate.js.map