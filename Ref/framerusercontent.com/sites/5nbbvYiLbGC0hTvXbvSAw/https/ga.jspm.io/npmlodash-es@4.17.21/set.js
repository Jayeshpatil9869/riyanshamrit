import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import "./_/60d30700.js";
import "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import "./_/b669c81f.js";
import {
    b as t
} from "./_/6c34ab6b.js";
/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(i, r, s) {
    return null == i ? i : t(i, r, s)
}
export default set;

//# sourceMappingURL=set.js.map