import "./_/f08a6ffe.js";
import {
    S as r
} from "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import t from "./_copyArray.js";
import "./_/98062778.js";
import "./isLength.js";
import o from "./isArrayLike.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import "./_/7953e050.js";
import "./_/48027737.js";
import "./keys.js";
import "./_/72487e58.js";
import "./_/1386403c.js";
import {
    s as i
} from "./_/0b311353.js";
import {
    g as s
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import {
    m
} from "./_/6703045c.js";
import {
    s as p
} from "./_/f01ae9b5.js";
import j from "./isString.js";
import "./_/f92f157a.js";
import e from "./values.js";
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(r) {
    var t, o = [];
    while (!(t = r.next()).done) o.push(t.value);
    return o
}
var a = "[object Map]",
    f = "[object Set]";
var _ = r ? r.iterator : void 0;
/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray(r) {
    if (!r) return [];
    if (o(r)) return j(r) ? i(r) : t(r);
    if (_ && r[_]) return iteratorToArray(r[_]());
    var c = s(r),
        n = c == a ? m : c == f ? p : e;
    return n(r)
}
export default toArray;

//# sourceMappingURL=toArray.js.map