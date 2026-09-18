import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import t from "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/865f4d28.js";
import {
    a as s
} from "./_/703e5e28.js";
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
import r from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/196bc89c.js";
import "./_/218be937.js";
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
import o from "./mergeWith.js";
/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(s, r, o, e, m, j) {
    if (t(s) && t(r)) {
        j.set(r, s);
        i(s, r, void 0, customDefaultsMerge, j);
        j.delete(r)
    }
    return s
}
/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var e = r((function(t) {
    t.push(void 0, customDefaultsMerge);
    return s(o, void 0, t)
}));
export default e;

//# sourceMappingURL=defaultsDeep.js.map