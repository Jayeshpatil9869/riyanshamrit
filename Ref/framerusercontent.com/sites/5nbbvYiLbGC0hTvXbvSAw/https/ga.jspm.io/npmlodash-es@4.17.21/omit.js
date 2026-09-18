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
import "./_/865f4d28.js";
import "./_/703e5e28.js";
import "./_copyArray.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_arrayEach.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import "./_/60d30700.js";
import {
    c as t
} from "./_/8dfaf20e.js";
import "./_overRest.js";
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
import {
    c as s
} from "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import "./_/b669c81f.js";
import "./_/59d1abe4.js";
import "./_/7100b469.js";
import "./_/4175b908.js";
import "./flatten.js";
import {
    f as i
} from "./_/a1bc051a.js";
import "./_/e52eecc0.js";
import o from "./isPlainObject.js";
import "./_/1d34989e.js";
import "./_/0b247f18.js";
import "./_/c84dc829.js";
import m from "./_baseClone.js";
import "./_/78e9d69b.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import "./_/7c293c91.js";
import {
    g as p
} from "./_/5f9acba5.js";
import "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import "./isMap.js";
import "./isSet.js";
import "./last.js";
import "./_/29a9b3d3.js";
import {
    b as j
} from "./_/539e17c9.js";
/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(r) {
    return o(r) ? void 0 : r
}
var e = 1,
    a = 2,
    _ = 4;
/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var f = i((function(i, o) {
    var f = {};
    if (null == i) return f;
    var c = false;
    o = r(o, (function(r) {
        r = s(r, i);
        c || (c = r.length > 1);
        return r
    }));
    t(i, p(i), f);
    c && (f = m(f, e | a | _, customOmitClone));
    var n = o.length;
    while (n--) j(f, o[n]);
    return f
}));
export default f;

//# sourceMappingURL=omit.js.map