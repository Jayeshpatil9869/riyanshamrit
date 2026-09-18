import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import r from "./toInteger.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import {
    b as t
} from "./_/b225817a.js";
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
    b as i
} from "./_/a6855e68.js";
var s = Math.max,
    o = Math.min;
/**
 * This method is like `_.findIndex` except that it iterates over elements
 * of `collection` from right to left.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=array.length-1] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': true },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': false }
 * ];
 *
 * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
 * // => 2
 *
 * // The `_.matches` iteratee shorthand.
 * _.findLastIndex(users, { 'user': 'barney', 'active': true });
 * // => 0
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findLastIndex(users, ['active', false]);
 * // => 2
 *
 * // The `_.property` iteratee shorthand.
 * _.findLastIndex(users, 'active');
 * // => 0
 */
function findLastIndex(m, p, j) {
    var e = null == m ? 0 : m.length;
    if (!e) return -1;
    var _ = e - 1;
    if (void 0 !== j) {
        _ = r(j);
        _ = j < 0 ? s(e + _, 0) : o(_, e - 1)
    }
    return t(m, i(p, 3), _, true)
}
export default findLastIndex;

//# sourceMappingURL=findLastIndex.js.map