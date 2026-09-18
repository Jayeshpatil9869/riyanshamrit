import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import i from "./toInteger.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i as t
} from "./_/196bc89c.js";
import "./_/b1d05723.js";
import r from "./toLength.js";
/**
 * The base implementation of `_.fill` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 */
function baseFill(t, o, s, e) {
    var m = t.length;
    s = i(s);
    s < 0 && (s = -s > m ? 0 : m + s);
    e = void 0 === e || e > m ? m : i(e);
    e < 0 && (e += m);
    e = s > e ? 0 : r(e);
    while (s < e) t[s++] = o;
    return t
}
/**
 * Fills elements of `array` with `value` from `start` up to, but not
 * including, `end`.
 *
 * **Note:** This method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Array
 * @param {Array} array The array to fill.
 * @param {*} value The value to fill `array` with.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns `array`.
 * @example
 *
 * var array = [1, 2, 3];
 *
 * _.fill(array, 'a');
 * console.log(array);
 * // => ['a', 'a', 'a']
 *
 * _.fill(Array(3), 2);
 * // => [2, 2, 2]
 *
 * _.fill([4, 6, 8, 10], '*', 1, 3);
 * // => [4, '*', '*', 10]
 */
function fill(i, r, o, s) {
    var e = null == i ? 0 : i.length;
    if (!e) return [];
    if (o && "number" != typeof o && t(i, r, o)) {
        o = 0;
        s = e
    }
    return baseFill(i, r, o, s)
}
export default fill;

//# sourceMappingURL=fill.js.map