import "./_/f08a6ffe.js";
import {
    b as r
} from "./_/9bf895a3.js";
import e from "./isObjectLike.js";
var t = "[object Arguments]";
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(a) {
    return e(a) && r(a) == t
}
var a = Object.prototype;
var s = a.hasOwnProperty;
var n = a.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var o = baseIsArguments(function() {
    return arguments
}()) ? baseIsArguments : function(r) {
    return e(r) && s.call(r, "callee") && !n.call(r, "callee")
};
export default o;

//# sourceMappingURL=isArguments.js.map