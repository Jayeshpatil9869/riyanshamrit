import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as r
} from "./_/c8f2469a.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import t from "./toString.js";
import "./_/1d34989e.js";
import {
    c as i
} from "./_/16393db3.js";
import "./_/1386403c.js";
import {
    s as o
} from "./_/0b311353.js";
import {
    c as s
} from "./_/321ee86c.js";
var m = /^\s+/;
/**
 * Removes leading whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trimStart('  abc  ');
 * // => 'abc  '
 *
 * _.trimStart('-_-abc-_-', '_-');
 * // => 'abc-_-'
 */
function trimStart(a, p, j) {
    a = t(a);
    if (a && (j || void 0 === p)) return a.replace(m, "");
    if (!a || !(p = r(p))) return a;
    var e = o(a),
        f = s(e, o(p));
    return i(e, f).join("")
}
export default trimStart;

//# sourceMappingURL=trimStart.js.map