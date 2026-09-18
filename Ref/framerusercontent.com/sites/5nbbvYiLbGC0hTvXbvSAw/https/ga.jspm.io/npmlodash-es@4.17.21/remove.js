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
import "./_/1d34989e.js";
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
import "./last.js";
import "./_/29a9b3d3.js";
import "./_/539e17c9.js";
import {
    b as t
} from "./_/adc2d36d.js";
/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */
function remove(i, s) {
    var o = [];
    if (!(i && i.length)) return o;
    var m = -1,
        p = [],
        j = i.length;
    s = r(s, 3);
    while (++m < j) {
        var e = i[m];
        if (s(e, m, i)) {
            o.push(e);
            p.push(m)
        }
    }
    t(i, p);
    return o
}
export default remove;

//# sourceMappingURL=remove.js.map