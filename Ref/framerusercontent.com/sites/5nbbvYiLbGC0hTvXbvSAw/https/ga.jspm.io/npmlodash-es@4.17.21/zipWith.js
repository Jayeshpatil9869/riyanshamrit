import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./_arrayMap.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_overRest.js";
import t from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/e524acca.js";
import "./_arrayFilter.js";
import "./_baseProperty.js";
import "./isArrayLikeObject.js";
import "./unzip.js";
import i from "./unzipWith.js";
/**
 * This method is like `_.zip` except that it accepts `iteratee` to specify
 * how grouped values should be combined. The iteratee is invoked with the
 * elements of each group: (...group).
 *
 * @static
 * @memberOf _
 * @since 3.8.0
 * @category Array
 * @param {...Array} [arrays] The arrays to process.
 * @param {Function} [iteratee=_.identity] The function to combine
 *  grouped values.
 * @returns {Array} Returns the new array of grouped elements.
 * @example
 *
 * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
 *   return a + b + c;
 * });
 * // => [111, 222]
 */
var r = t((function(t) {
    var r = t.length,
        o = r > 1 ? t[r - 1] : void 0;
    o = "function" == typeof o ? (t.pop(), o) : void 0;
    return i(t, o)
}));
export default r;

//# sourceMappingURL=zipWith.js.map