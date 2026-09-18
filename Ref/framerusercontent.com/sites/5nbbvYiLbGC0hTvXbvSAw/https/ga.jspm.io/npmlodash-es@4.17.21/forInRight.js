import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
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
import i from "./keysIn.js";
import "./_/874eb754.js";
import {
    c as r
} from "./_/cd8e8b5d.js";
import {
    b as s
} from "./_/c5f390e5.js";
/**
 * This method is like `_.forIn` except that it iterates over properties of
 * `object` in the opposite order.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forInRight(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
 */
function forInRight(t, o) {
    return null == t ? t : s(t, r(o), i)
}
export default forInRight;

//# sourceMappingURL=forInRight.js.map