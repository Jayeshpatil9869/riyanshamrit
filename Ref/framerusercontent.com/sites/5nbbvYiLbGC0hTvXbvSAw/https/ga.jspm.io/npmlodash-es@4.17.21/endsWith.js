import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as t
} from "./_/c8f2469a.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import r from "./toInteger.js";
import i from "./toString.js";
import {
    b as o
} from "./_/b1d05723.js";
/**
 * Checks if `string` ends with the given target string.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {string} [target] The string to search for.
 * @param {number} [position=string.length] The position to search up to.
 * @returns {boolean} Returns `true` if `string` ends with `target`,
 *  else `false`.
 * @example
 *
 * _.endsWith('abc', 'c');
 * // => true
 *
 * _.endsWith('abc', 'b');
 * // => false
 *
 * _.endsWith('abc', 'b', 2);
 * // => true
 */
function endsWith(s, m, j) {
    s = i(s);
    m = t(m);
    var p = s.length;
    j = void 0 === j ? p : o(r(j), 0, p);
    var e = j;
    j -= m.length;
    return j >= 0 && s.slice(j, e) == m
}
export default endsWith;

//# sourceMappingURL=endsWith.js.map