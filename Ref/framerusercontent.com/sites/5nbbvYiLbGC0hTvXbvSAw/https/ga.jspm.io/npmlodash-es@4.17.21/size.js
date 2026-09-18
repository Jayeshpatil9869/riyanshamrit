import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./isLength.js";
import r from "./isArrayLike.js";
import "./_/df9293ee.js";
import "./_/7953e050.js";
import {
    b as i
} from "./_/48027737.js";
import "./_/72487e58.js";
import "./_/1386403c.js";
import {
    g as t
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import "./_baseProperty.js";
import s from "./isString.js";
import {
    s as o
} from "./_/5430d57b.js";
var e = "[object Map]",
    m = "[object Set]";
/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(j) {
    if (null == j) return 0;
    if (r(j)) return s(j) ? o(j) : j.length;
    var p = t(j);
    return p == e || p == m ? j.size : i(j).length
}
export default size;

//# sourceMappingURL=size.js.map