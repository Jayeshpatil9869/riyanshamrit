import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import r from "./toInteger.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i as t
} from "./_/196bc89c.js";
import i from "./toString.js";
import {
    b as o
} from "./_/01736674.js";
/**
 * Repeats the given string `n` times.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to repeat.
 * @param {number} [n=1] The number of times to repeat the string.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the repeated string.
 * @example
 *
 * _.repeat('*', 3);
 * // => '***'
 *
 * _.repeat('abc', 2);
 * // => 'abcabc'
 *
 * _.repeat('abc', 0);
 * // => ''
 */
function repeat(s, m, p) {
    m = (p ? t(s, m, p) : void 0 === m) ? 1 : r(m);
    return o(i(s), m)
}
export default repeat;

//# sourceMappingURL=repeat.js.map