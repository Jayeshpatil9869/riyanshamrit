import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import t from "./isObjectLike.js";
import e from "./isLength.js";
import {
    b as o
} from "./_/43b5d56d.js";
import {
    n as a
} from "./_/17fb905d.js";
var b = "[object Arguments]",
    j = "[object Array]",
    c = "[object Boolean]",
    i = "[object Date]",
    n = "[object Error]",
    s = "[object Function]",
    y = "[object Map]",
    f = "[object Number]",
    A = "[object Object]",
    m = "[object RegExp]",
    p = "[object Set]",
    d = "[object String]",
    u = "[object WeakMap]";
var l = "[object ArrayBuffer]",
    g = "[object DataView]",
    v = "[object Float32Array]",
    I = "[object Float64Array]",
    U = "[object Int8Array]",
    _ = "[object Int16Array]",
    F = "[object Int32Array]",
    T = "[object Uint8Array]",
    h = "[object Uint8ClampedArray]",
    k = "[object Uint16Array]",
    x = "[object Uint32Array]";
var B = {};
B[v] = B[I] = B[U] = B[_] = B[F] = B[T] = B[h] = B[k] = B[x] = true;
B[b] = B[j] = B[l] = B[c] = B[g] = B[i] = B[n] = B[s] = B[y] = B[f] = B[A] = B[m] = B[p] = B[d] = B[u] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(o) {
    return t(o) && e(o.length) && !!B[r(o)]
}
var D = a && a.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var E = D ? o(D) : baseIsTypedArray;
export default E;

//# sourceMappingURL=isTypedArray.js.map