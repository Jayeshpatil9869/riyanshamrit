import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/865f4d28.js";
import "./_/703e5e28.js";
import "./_copyArray.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import "./_/60d30700.js";
import "./_/8dfaf20e.js";
import "./_overRest.js";
import "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/196bc89c.js";
import {
    c as s
} from "./_/218be937.js";
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
import "./keysIn.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/e52eecc0.js";
import "./isPlainObject.js";
import "./_/0b247f18.js";
import "./_/78e9d69b.js";
import "./_/874eb754.js";
import "./_/5f448d66.js";
import {
    b as i
} from "./_/ef42d5a5.js";
import "./isArrayLikeObject.js";
import "./toPlainObject.js";
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var t = s((function(s, t, r) {
    i(s, t, r)
}));
export default t;

//# sourceMappingURL=merge.js.map