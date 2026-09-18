import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import f from "./isObjectLike.js";
import {
    b as a
} from "./_/43b5d56d.js";
import {
    n as s
} from "./_/17fb905d.js";
var e = "[object ArrayBuffer]";
/**
 * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 */
function baseIsArrayBuffer(a) {
    return f(a) && r(a) == e
}
var o = s && s.isArrayBuffer;
/**
 * Checks if `value` is classified as an `ArrayBuffer` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
 * @example
 *
 * _.isArrayBuffer(new ArrayBuffer(2));
 * // => true
 *
 * _.isArrayBuffer(new Array(2));
 * // => false
 */
var t = o ? a(o) : baseIsArrayBuffer;
export default t;

//# sourceMappingURL=isArrayBuffer.js.map