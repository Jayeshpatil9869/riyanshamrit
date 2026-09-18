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
import r from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/43b5d56d.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/9b3b36d6.js";
import "./isArrayLikeObject.js";
import "./_/3d95c57d.js";
import {
    c as i,
    b as s
} from "./_/85b0a0e9.js";
/**
 * Creates an array of unique values that are included in all given arrays
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons. The order and references of result values are
 * determined by the first array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersection([2, 1], [2, 3]);
 * // => [2]
 */
var o = r((function(r) {
    var o = t(r, i);
    return o.length && o[0] === r[0] ? s(o) : []
}));
export default o;

//# sourceMappingURL=intersection.js.map