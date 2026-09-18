import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import r from "./toString.js";
import {
    b as t
} from "./_/8fb9d566.js";
var o = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'"
};
/**
 * Used by `_.unescape` to convert HTML entities to characters.
 *
 * @private
 * @param {string} chr The matched character to unescape.
 * @returns {string} Returns the unescaped character.
 */
var a = t(o);
var p = /&(?:amp|lt|gt|quot|#39);/g,
    s = RegExp(p.source);
/**
 * The inverse of `_.escape`; this method converts the HTML entities
 * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
 * their corresponding characters.
 *
 * **Note:** No other HTML entities are unescaped. To unescape additional
 * HTML entities use a third-party library like [_he_](https://mths.be/he).
 *
 * @static
 * @memberOf _
 * @since 0.6.0
 * @category String
 * @param {string} [string=''] The string to unescape.
 * @returns {string} Returns the unescaped string.
 * @example
 *
 * _.unescape('fred, barney, &amp; pebbles');
 * // => 'fred, barney, & pebbles'
 */
function unescape(t) {
    t = r(t);
    return t && s.test(t) ? t.replace(p, a) : t
}
export default unescape;

//# sourceMappingURL=unescape.js.map