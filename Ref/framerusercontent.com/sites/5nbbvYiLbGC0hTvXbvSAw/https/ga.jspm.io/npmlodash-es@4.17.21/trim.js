import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as r
} from "./_/c8f2469a.js";
import "./_/2a83f3a2.js";
import {
    b as o
} from "./_/399d274a.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import i from "./toString.js";
import "./_/1d34989e.js";
import {
    c as s
} from "./_/16393db3.js";
import "./_/1386403c.js";
import {
    s as t
} from "./_/0b311353.js";
import {
    c as m
} from "./_/f2edc6f2.js";
import {
    c as f
} from "./_/321ee86c.js";
/**
 * Removes leading and trailing whitespace or specified characters from `string`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to trim.
 * @param {string} [chars=whitespace] The characters to trim.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {string} Returns the trimmed string.
 * @example
 *
 * _.trim('  abc  ');
 * // => 'abc'
 *
 * _.trim('-_-abc-_-', '_-');
 * // => 'abc'
 *
 * _.map(['  foo  ', '  bar  '], _.trim);
 * // => ['foo', 'bar']
 */
function trim(j, p, a) {
    j = i(j);
    if (j && (a || void 0 === p)) return o(j);
    if (!j || !(p = r(p))) return j;
    var e = t(j),
        _ = t(p),
        c = f(e, _),
        b = m(e, _) + 1;
    return s(e, c, b).join("")
}
export default trim;

//# sourceMappingURL=trim.js.map