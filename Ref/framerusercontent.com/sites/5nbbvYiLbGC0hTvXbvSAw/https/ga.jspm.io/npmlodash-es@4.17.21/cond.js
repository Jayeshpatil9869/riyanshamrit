import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import r from "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import {
    a as t
} from "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./eq.js";
import "./_overRest.js";
import i from "./_baseRest.js";
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
    b as s
} from "./_/a6855e68.js";
var o = "Expected a function";
/**
 * Creates a function that iterates over `pairs` and invokes the corresponding
 * function of the first predicate to return truthy. The predicate-function
 * pairs are invoked with the `this` binding and arguments of the created
 * function.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Util
 * @param {Array} pairs The predicate-function pairs.
 * @returns {Function} Returns the new composite function.
 * @example
 *
 * var func = _.cond([
 *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
 *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
 *   [_.stubTrue,                      _.constant('no match')]
 * ]);
 *
 * func({ 'a': 1, 'b': 2 });
 * // => 'matches A'
 *
 * func({ 'a': 0, 'b': 1 });
 * // => 'matches B'
 *
 * func({ 'a': '1', 'b': '2' });
 * // => 'no match'
 */
function cond(p) {
    var m = null == p ? 0 : p.length,
        j = s;
    p = m ? r(p, (function(r) {
        if ("function" != typeof r[1]) throw new TypeError(o);
        return [j(r[0]), r[1]]
    })) : [];
    return i((function(r) {
        var i = -1;
        while (++i < m) {
            var s = p[i];
            if (t(s[0], this, r)) return t(s[1], this, r)
        }
    }))
}
export default cond;

//# sourceMappingURL=cond.js.map