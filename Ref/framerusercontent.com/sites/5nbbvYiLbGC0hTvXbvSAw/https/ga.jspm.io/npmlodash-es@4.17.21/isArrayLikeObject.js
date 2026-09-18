import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import i from "./isObjectLike.js";
import "./isObject.js";
import "./isFunction.js";
import "./isLength.js";
import r from "./isArrayLike.js";
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(t) {
    return i(t) && r(t)
}
export default isArrayLikeObject;

//# sourceMappingURL=isArrayLikeObject.js.map