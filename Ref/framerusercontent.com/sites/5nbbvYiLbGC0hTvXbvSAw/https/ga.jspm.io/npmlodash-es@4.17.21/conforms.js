import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./_/865f4d28.js";
import "./_copyArray.js";
import "./_/198d994d.js";
import "./_arrayEach.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import "./_/60d30700.js";
import "./_/8dfaf20e.js";
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
import r from "./keys.js";
import "./keysIn.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/7100b469.js";
import "./_/e52eecc0.js";
import "./_/0b247f18.js";
import "./_/c84dc829.js";
import s from "./_baseClone.js";
import "./_/78e9d69b.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import "./_/7c293c91.js";
import "./_/5f9acba5.js";
import "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import "./isMap.js";
import "./isSet.js";
import {
    b as i
} from "./_/d32deed4.js";
/**
 * The base implementation of `_.conforms` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 */
function baseConforms(s) {
    var o = r(s);
    return function(r) {
        return i(r, s, o)
    }
}
var o = 1;
/**
 * Creates a function that invokes the predicate properties of `source` with
 * the corresponding property values of a given object, returning `true` if
 * all predicates return truthy, else `false`.
 *
 * **Note:** The created function is equivalent to `_.conformsTo` with
 * `source` partially applied.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {Object} source The object of property predicates to conform to.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * var objects = [
 *   { 'a': 2, 'b': 1 },
 *   { 'a': 1, 'b': 2 }
 * ];
 *
 * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
 * // => [{ 'a': 1, 'b': 2 }]
 */
function conforms(r) {
    return baseConforms(s(r, o))
}
export default conforms;

//# sourceMappingURL=conforms.js.map