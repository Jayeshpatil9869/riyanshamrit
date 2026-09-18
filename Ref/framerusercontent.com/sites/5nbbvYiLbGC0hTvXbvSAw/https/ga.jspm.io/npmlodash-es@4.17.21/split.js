import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as r
} from "./_/c8f2469a.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./eq.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i
} from "./_/196bc89c.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import s from "./toString.js";
import "./_/1d34989e.js";
import {
    c as t
} from "./_/16393db3.js";
import {
    h as o
} from "./_/1386403c.js";
import {
    s as m
} from "./_/0b311353.js";
import p from "./isRegExp.js";
var j = 4294967295;
/**
 * Splits `string` by `separator`.
 *
 * **Note:** This method is based on
 * [`String#split`](https://mdn.io/String/split).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to split.
 * @param {RegExp|string} separator The separator pattern to split by.
 * @param {number} [limit] The length to truncate results to.
 * @returns {Array} Returns the string segments.
 * @example
 *
 * _.split('a-b-c', '-', 2);
 * // => ['a', 'b']
 */
function split(f, e, a) {
    a && "number" != typeof a && i(f, e, a) && (e = a = void 0);
    a = void 0 === a ? j : a >>> 0;
    if (!a) return [];
    f = s(f);
    if (f && ("string" == typeof e || null != e && !p(e))) {
        e = r(e);
        if (!e && o(f)) return t(m(f), 0, a)
    }
    return f.split(e, a)
}
export default split;

//# sourceMappingURL=split.js.map