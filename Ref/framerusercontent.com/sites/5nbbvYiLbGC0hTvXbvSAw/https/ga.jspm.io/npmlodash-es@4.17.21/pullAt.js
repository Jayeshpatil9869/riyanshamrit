import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import t from "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import {
    i as r
} from "./_/98062778.js";
import "./eq.js";
import "./_overRest.js";
import "./isArguments.js";
import "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import "./_/b669c81f.js";
import "./_/59d1abe4.js";
import "./get.js";
import {
    b as o
} from "./_/b00ceba6.js";
import "./_/7100b469.js";
import "./_/4175b908.js";
import "./flatten.js";
import {
    f as s
} from "./_/a1bc051a.js";
import "./_/1d34989e.js";
import "./last.js";
import "./_/29a9b3d3.js";
import "./_/539e17c9.js";
import {
    c as i
} from "./_/2ad708e7.js";
import {
    b as m
} from "./_/adc2d36d.js";
/**
 * Removes elements from `array` corresponding to `indexes` and returns an
 * array of removed elements.
 *
 * **Note:** Unlike `_.at`, this method mutates `array`.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {...(number|number[])} [indexes] The indexes of elements to remove.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = ['a', 'b', 'c', 'd'];
 * var pulled = _.pullAt(array, [1, 3]);
 *
 * console.log(array);
 * // => ['a', 'c']
 *
 * console.log(pulled);
 * // => ['b', 'd']
 */
var j = s((function(s, j) {
    var p = null == s ? 0 : s.length,
        e = o(s, j);
    m(s, t(j, (function(t) {
        return r(t, p) ? +t : t
    })).sort(i));
    return e
}));
export default j;

//# sourceMappingURL=pullAt.js.map