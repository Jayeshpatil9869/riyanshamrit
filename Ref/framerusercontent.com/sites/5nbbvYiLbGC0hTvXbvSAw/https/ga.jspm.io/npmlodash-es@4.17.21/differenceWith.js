import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/ef6cf5be.js";
import "./eq.js";
import "./_overRest.js";
import r from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./isArguments.js";
import "./_/43b5d56d.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/7100b469.js";
import {
    b as t
} from "./_/4175b908.js";
import "./_/9b3b36d6.js";
import i from "./isArrayLikeObject.js";
import "./_/3d95c57d.js";
import {
    b as s
} from "./_/f57cea36.js";
import o from "./last.js";
/**
 * This method is like `_.difference` except that it accepts `comparator`
 * which is invoked to compare elements of `array` to `values`. The order and
 * references of result values are determined by the first array. The comparator
 * is invoked with two arguments: (arrVal, othVal).
 *
 * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...Array} [values] The values to exclude.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 *
 * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
 * // => [{ 'x': 2, 'y': 1 }]
 */
var m = r((function(r, m) {
    var j = o(m);
    i(j) && (j = void 0);
    return i(r) ? s(r, t(m, 1, i, true), void 0, j) : []
}));
export default m;

//# sourceMappingURL=differenceWith.js.map