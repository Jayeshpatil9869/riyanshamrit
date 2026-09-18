import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import t from "./_arrayMap.js";
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
import i from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/43b5d56d.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/9b3b36d6.js";
import "./isArrayLikeObject.js";
import "./_/3d95c57d.js";
import r from "./last.js";
import {
    c as o,
    b as s
} from "./_/85b0a0e9.js";
/**
 * This method is like `_.intersection` except that it accepts `comparator`
 * which is invoked to compare elements of `arrays`. The order and references
 * of result values are determined by the first array. The comparator is
 * invoked with two arguments: (arrVal, othVal).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
 *
 * _.intersectionWith(objects, others, _.isEqual);
 * // => [{ 'x': 1, 'y': 2 }]
 */
var p = i((function(i) {
    var p = r(i),
        m = t(i, o);
    p = "function" == typeof p ? p : void 0;
    p && m.pop();
    return m.length && m[0] === i[0] ? s(m, void 0, p) : []
}));
export default p;

//# sourceMappingURL=intersectionWith.js.map