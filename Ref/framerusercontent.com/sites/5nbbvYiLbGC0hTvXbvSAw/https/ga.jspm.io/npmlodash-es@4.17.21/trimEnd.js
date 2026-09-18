import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as r
} from "./_/c8f2469a.js";
import {
    t as i
} from "./_/2a83f3a2.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import o from "./toString.js";
import "./_/1d34989e.js";
import {
    c as t
} from "./_/16393db3.js";
import "./_/1386403c.js";
import {
    s
} from "./_/0b311353.js";
import {
    c as m
} from "./_/f2edc6f2.js";
/**
 * Removes trailing whitespace or specified characters from `string`.
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
 * _.trimEnd('  abc  ');
 * // => '  abc'
 *
 * _.trimEnd('-_-abc-_-', '_-');
 * // => '-_-abc'
 */
function trimEnd(f, j, p) {
    f = o(f);
    if (f && (p || void 0 === j)) return f.slice(0, i(f) + 1);
    if (!f || !(j = r(j))) return f;
    var a = s(f),
        e = m(a, s(j)) + 1;
    return t(a, 0, e).join("")
}
export default trimEnd;

//# sourceMappingURL=trimEnd.js.map