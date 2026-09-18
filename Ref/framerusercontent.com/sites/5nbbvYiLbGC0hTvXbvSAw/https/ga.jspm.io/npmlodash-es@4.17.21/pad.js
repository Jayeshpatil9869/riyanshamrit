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
import t from "./toString.js";
import "./_/1d34989e.js";
import "./_/16393db3.js";
import "./_/1386403c.js";
import "./_/0b311353.js";
import "./_baseProperty.js";
import "./_/01736674.js";
import {
    s as o
} from "./_/5430d57b.js";
import {
    c as i
} from "./_/1b8f7435.js";
var s = Math.ceil,
    m = Math.floor;
/**
 * Pads `string` on the left and right sides if it's shorter than `length`.
 * Padding characters are truncated if they can't be evenly divided by `length`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.pad('abc', 8);
 * // => '  abc   '
 *
 * _.pad('abc', 8, '_-');
 * // => '_-abc_-_'
 *
 * _.pad('abc', 3);
 * // => 'abc'
 */
function pad(p, j, a) {
    p = t(p);
    j = r(j);
    var e = j ? o(p) : 0;
    if (!j || e >= j) return p;
    var f = (j - e) / 2;
    return i(m(f), a) + p + i(s(f), a)
}
export default pad;

//# sourceMappingURL=pad.js.map