import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObject.js";
import r from "./isFunction.js";
import {
    c as s,
    b as t
} from "./_/ccff797b.js";
import o from "./stubFalse.js";
/**
 * Checks if `func` is capable of being masked.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
 */
var i = s ? r : o;
var e = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.";
/**
 * Checks if `value` is a pristine native function.
 *
 * **Note:** This method can't reliably detect native functions in the presence
 * of the core-js package because core-js circumvents this kind of detection.
 * Despite multiple requests, the core-js maintainer has made it clear: any
 * attempt to fix the detection will be obstructed. As a result, we're left
 * with little choice but to throw an error. Unfortunately, this also affects
 * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
 * which rely on core-js.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(r) {
    if (i(r)) throw new Error(e);
    return t(r)
}
export default isNative;

//# sourceMappingURL=isNative.js.map