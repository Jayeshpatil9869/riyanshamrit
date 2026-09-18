import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import o from "./toFinite.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i
} from "./_/196bc89c.js";
import {
    b as r
} from "./_/c96a0489.js";
var t = parseFloat;
var e = Math.min,
    s = Math.random;
/**
 * Produces a random number between the inclusive `lower` and `upper` bounds.
 * If only one argument is provided a number between `0` and the given number
 * is returned. If `floating` is `true`, or either `lower` or `upper` are
 * floats, a floating-point number is returned instead of an integer.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @memberOf _
 * @since 0.7.0
 * @category Number
 * @param {number} [lower=0] The lower bound.
 * @param {number} [upper=1] The upper bound.
 * @param {boolean} [floating] Specify returning a floating-point number.
 * @returns {number} Returns the random number.
 * @example
 *
 * _.random(0, 5);
 * // => an integer between 0 and 5
 *
 * _.random(5);
 * // => also an integer between 0 and 5
 *
 * _.random(5, true);
 * // => a floating-point number between 0 and 5
 *
 * _.random(1.2, 5.2);
 * // => a floating-point number between 1.2 and 5.2
 */
function random(m, a, p) {
    p && "boolean" != typeof p && i(m, a, p) && (a = p = void 0);
    if (void 0 === p)
        if ("boolean" == typeof a) {
            p = a;
            a = void 0
        } else if ("boolean" == typeof m) {
        p = m;
        m = void 0
    }
    if (void 0 === m && void 0 === a) {
        m = 0;
        a = 1
    } else {
        m = o(m);
        if (void 0 === a) {
            a = m;
            m = 0
        } else a = o(a)
    }
    if (m > a) {
        var f = m;
        m = a;
        a = f
    }
    if (p || m % 1 || a % 1) {
        var j = s();
        return e(m + j * (a - m + t("1e-" + ((j + "").length - 1))), a)
    }
    return r(m, a)
}
export default random;

//# sourceMappingURL=random.js.map