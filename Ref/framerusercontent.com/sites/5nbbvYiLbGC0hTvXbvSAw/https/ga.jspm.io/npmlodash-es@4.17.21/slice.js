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
import {
    b as r
} from "./_/1d34989e.js";
/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(o, s, e) {
    var m = null == o ? 0 : o.length;
    if (!m) return [];
    if (e && "number" != typeof e && t(o, s, e)) {
        s = 0;
        e = m
    } else {
        s = null == s ? 0 : i(s);
        e = void 0 === e ? m : i(e)
    }
    return r(o, s, e)
}
export default slice;

//# sourceMappingURL=slice.js.map