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
import "./_/9b3b36d6.js";
import "./_/d971f180.js";
import "./_/6703045c.js";
import "./_/f01ae9b5.js";
import "./_/e572f727.js";
import "./_/7e89d739.js";
import "./_/3cfb9cd3.js";
import {
    b as s
} from "./_/2d110264.js";
var i = 1;
/**
 * Creates a function that performs a partial deep comparison between a given
 * object and `source`, returning `true` if the given object has equivalent
 * property values, else `false`.
 *
 * **Note:** The created function is equivalent to `_.isMatch` with `source`
 * partially applied.
 *
 * Partial comparisons will match empty array and empty object `source`
 * values against any array or object value, respectively. See `_.isEqual`
 * for a list of supported value comparisons.
 *
 * **Note:** Multiple values can be checked by combining several matchers
 * using `_.overSome`
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 * @example
 *
 * var objects = [
 *   { 'a': 1, 'b': 2, 'c': 3 },
 *   { 'a': 4, 'b': 5, 'c': 6 }
 * ];
 *
 * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
 * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
 *
 * // Checking for several possible values
 * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
 * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
 */
function matches(t) {
    return s(r(t, i))
}
export default matches;

//# sourceMappingURL=matches.js.map