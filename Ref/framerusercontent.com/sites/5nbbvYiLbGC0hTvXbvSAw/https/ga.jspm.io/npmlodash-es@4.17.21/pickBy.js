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
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import "./_/60d30700.js";
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
import "./_/e52eecc0.js";
import "./_/0b247f18.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import "./_/7c293c91.js";
import {
    g as i
} from "./_/5f9acba5.js";
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
    b as t
} from "./_/a6855e68.js";
import "./_/6c34ab6b.js";
import {
    b as s
} from "./_/6d636edf.js";
/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(o, m) {
    if (null == o) return {};
    var p = r(i(o), (function(r) {
        return [r]
    }));
    m = t(m);
    return s(o, p, (function(r, i) {
        return m(r, i[0])
    }))
}
export default pickBy;

//# sourceMappingURL=pickBy.js.map