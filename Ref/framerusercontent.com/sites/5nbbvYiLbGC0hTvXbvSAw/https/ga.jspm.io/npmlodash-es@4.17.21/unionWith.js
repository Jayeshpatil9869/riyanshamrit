import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./noop.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/b225817a.js";
import "./_/e10cd6f2.js";
import "./_baseIndexOf.js";
import "./_/ef6cf5be.js";
import "./eq.js";
import "./_overRest.js";
import t from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./isArguments.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/7100b469.js";
import {
    b as r
} from "./_/4175b908.js";
import "./_/573cd97d.js";
import "./_/9b3b36d6.js";
import "./_/f01ae9b5.js";
import i from "./isArrayLikeObject.js";
import "./_/3d95c57d.js";
import s from "./last.js";
import {
    b as o
} from "./_/2a349283.js";
/**
 * This method is like `_.union` except that it accepts `comparator` which
 * is invoked to compare elements of `arrays`. Result values are chosen from
 * the first array in which the value occurs. The comparator is invoked
 * with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.unionWith(objects, others, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
 */
var m = t((function(t) {
    var m = s(t);
    m = "function" == typeof m ? m : void 0;
    return o(r(t, 1, i, true), void 0, m)
}));
export default m;

//# sourceMappingURL=unionWith.js.map