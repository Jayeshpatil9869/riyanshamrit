import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./toString.js";
import "./_/cf0de6d8.js";
import "./_/8fb9d566.js";
import "./deburr.js";
import "./words.js";
import {
    c as r
} from "./_/19aed38f.js";
/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */
var o = r((function(r, o, t) {
    return r + (t ? "-" : "") + o.toLowerCase()
}));
export default o;

//# sourceMappingURL=kebabCase.js.map