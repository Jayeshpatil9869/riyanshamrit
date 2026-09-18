import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./_/865f4d28.js";
import "./_/da987058.js";
import "./_/2500ebc8.js";
import "./_/93f70315.js";
import "./_copyArray.js";
import "./_/b0a4ea9b.js";
import r from "./wrapperLodash.js";
/**
 * Creates a `lodash` wrapper instance that wraps `value` with explicit method
 * chain sequences enabled. The result of such sequences must be unwrapped
 * with `_#value`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Seq
 * @param {*} value The value to wrap.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36 },
 *   { 'user': 'fred',    'age': 40 },
 *   { 'user': 'pebbles', 'age': 1 }
 * ];
 *
 * var youngest = _
 *   .chain(users)
 *   .sortBy('age')
 *   .map(function(o) {
 *     return o.user + ' is ' + o.age;
 *   })
 *   .head()
 *   .value();
 * // => 'pebbles is 1'
 */
function chain(i) {
    var t = r(i);
    t.__chain__ = true;
    return t
}
export default chain;

//# sourceMappingURL=chain.js.map