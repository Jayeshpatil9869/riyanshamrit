import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./_arrayMap.js";
import "./isObject.js";
import "./isFunction.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    b as t
} from "./_/e524acca.js";
import i from "./_arrayFilter.js";
import o from "./_baseProperty.js";
import e from "./isArrayLikeObject.js";
var s = Math.max;
/**
 * This method is like `_.zip` except that it accepts an array of grouped
 * elements and creates an array regrouping the elements to their pre-zip
 * configuration.
 *
 * @static
 * @memberOf _
 * @since 1.2.0
 * @category Array
 * @param {Array} array The array of grouped elements to process.
 * @returns {Array} Returns the new array of regrouped elements.
 * @example
 *
 * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
 * // => [['a', 1, true], ['b', 2, false]]
 *
 * _.unzip(zipped);
 * // => [['a', 'b'], [1, 2], [true, false]]
 */
function unzip(a) {
    if (!(a && a.length)) return [];
    var m = 0;
    a = i(a, (function(r) {
        if (e(r)) {
            m = s(r.length, m);
            return true
        }
    }));
    return t(m, (function(t) {
        return r(a, o(t))
    }))
}
export default unzip;

//# sourceMappingURL=unzip.js.map