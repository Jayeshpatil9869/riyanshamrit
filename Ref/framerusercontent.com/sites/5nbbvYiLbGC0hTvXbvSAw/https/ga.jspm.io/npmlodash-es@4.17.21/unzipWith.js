import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./_arrayMap.js";
import "./isObject.js";
import "./isFunction.js";
import {
    a as i
} from "./_/703e5e28.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/e524acca.js";
import "./_arrayFilter.js";
import "./_baseProperty.js";
import "./isArrayLikeObject.js";
import t from "./unzip.js";
/**
 * This method is like `_.unzip` except that it accepts `iteratee` to specify
 * how regrouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @static
 * @memberOf _
 * @since 3.8.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @param {Function} [iteratee=_.identity] The function to combine
 *  regrouped values.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
 * // => [[1, 10, 100], [2, 20, 200]]
 *
 * _.unzipWith(zipped, _.add);
 * // => [3, 30, 300]
 */
function unzipWith(o, s) {
    if (!(o && o.length)) return [];
    var e = t(o);
    return null == s ? e : r(e, (function(r) {
        return i(s, void 0, r)
    }))
}
export default unzipWith;

//# sourceMappingURL=unzipWith.js.map