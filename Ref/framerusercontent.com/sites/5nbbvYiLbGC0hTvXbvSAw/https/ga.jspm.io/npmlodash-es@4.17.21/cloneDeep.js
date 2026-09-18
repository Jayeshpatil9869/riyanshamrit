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
import "./keys.js";
import "./keysIn.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/7100b469.js";
import "./_/e52eecc0.js";
import "./_/0b247f18.js";
import "./_/c84dc829.js";
import r from "./_baseClone.js";
import "./_/78e9d69b.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import "./_/7c293c91.js";
import "./_/5f9acba5.js";
import "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import "./isMap.js";
import "./isSet.js";
var s = 1,
    i = 4;
/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(t) {
    return r(t, s | i)
}
export default cloneDeep;

//# sourceMappingURL=cloneDeep.js.map