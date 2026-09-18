import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./isLength.js";
import t from "./isArrayLike.js";
import {
    i
} from "./_/df9293ee.js";
import s from "./isArguments.js";
import "./stubFalse.js";
import o from "./isBuffer.js";
import e from "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/7953e050.js";
import {
    b as m
} from "./_/48027737.js";
import "./_/72487e58.js";
import {
    g as p
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
var f = "[object Map]",
    j = "[object Set]";
var a = Object.prototype;
var n = a.hasOwnProperty;
/**
 * Checks if `value` is an empty object, collection, map, or set.
 *
 * Objects are considered empty if they have no own enumerable string keyed
 * properties.
 *
 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
 * jQuery-like collections are considered empty if they have a `length` of `0`.
 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(a) {
    if (null == a) return true;
    if (t(a) && (r(a) || "string" == typeof a || "function" == typeof a.splice || o(a) || e(a) || s(a))) return !a.length;
    var c = p(a);
    if (c == f || c == j) return !a.size;
    if (i(a)) return !m(a).length;
    for (var u in a)
        if (n.call(a, u)) return false;
    return true
}
export default isEmpty;

//# sourceMappingURL=isEmpty.js.map