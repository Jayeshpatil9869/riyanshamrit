import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./_/98062778.js";
import "./eq.js";
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
import "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import "./_/b669c81f.js";
import "./_/59d1abe4.js";
import "./get.js";
import "./_/7100b469.js";
import "./_/0b247f18.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import "./_/7c293c91.js";
import "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import "./_/9b3b36d6.js";
import "./_/d971f180.js";
import "./_/6703045c.js";
import "./_/f01ae9b5.js";
import "./_/e572f727.js";
import "./_/7e89d739.js";
import "./_/3cfb9cd3.js";
import "./_/2d110264.js";
import "./hasIn.js";
import "./_/b37b231f.js";
import "./_/2aa8b3e7.js";
import "./_baseProperty.js";
import "./property.js";
import {
    b as r
} from "./_/a6855e68.js";
import "./_/874eb754.js";
import "./_/5f448d66.js";
import "./_baseForOwn.js";
import {
    c as t
} from "./_/ffabc09d.js";
var i = Object.prototype;
var s = i.hasOwnProperty;
var o = i.toString;
/**
 * This method is like `_.invert` except that the inverted object is generated
 * from the results of running each element of `object` thru `iteratee`. The
 * corresponding inverted value of each inverted key is an array of keys
 * responsible for generating the inverted value. The iteratee is invoked
 * with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.1.0
 * @category Object
 * @param {Object} object The object to invert.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Object} Returns the new inverted object.
 * @example
 *
 * var object = { 'a': 1, 'b': 2, 'c': 1 };
 *
 * _.invertBy(object);
 * // => { '1': ['a', 'c'], '2': ['b'] }
 *
 * _.invertBy(object, function(value) {
 *   return 'group' + value;
 * });
 * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
 */
var p = t((function(r, t, i) {
    null != t && "function" != typeof t.toString && (t = o.call(t));
    s.call(r, t) ? r[t].push(i) : r[t] = [i]
}), r);
export default p;

//# sourceMappingURL=invertBy.js.map