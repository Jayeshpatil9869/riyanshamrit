import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./isArray.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import "./_/7953e050.js";
import "./_/48027737.js";
import "./keys.js";
import "./_/874eb754.js";
import "./_/c8460b3f.js";
import {
    c as i
} from "./_/cd8e8b5d.js";
import "./_/c5f390e5.js";
import "./_/e4341960.js";
import {
    b as t
} from "./_/70ea53c3.js";
/**
 * A specialized version of `_.forEachRight` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEachRight(r, i) {
    var t = null == r ? 0 : r.length;
    while (t--)
        if (false === i(r[t], t, r)) break;
    return r
}
/**
 * This method is like `_.forEach` except that it iterates over elements of
 * `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @alias eachRight
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEach
 * @example
 *
 * _.forEachRight([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `2` then `1`.
 */
function forEachRight(s, o) {
    var m = r(s) ? arrayEachRight : t;
    return m(s, i(o))
}
export default forEachRight;

//# sourceMappingURL=forEachRight.js.map