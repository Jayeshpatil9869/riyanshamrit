import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import "./isObject.js";
import i from "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./eq.js";
import {
    c as r
} from "./_/0f88f209.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./memoize.js";
import "./_/6d63bab0.js";
import "./toString.js";
import {
    t
} from "./_/b669c81f.js";
/**
 * This method is like `_.get` except that if the resolved value is a
 * function it's invoked with the `this` binding of its parent object and
 * its result is returned.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to resolve.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
 *
 * _.result(object, 'a[0].b.c1');
 * // => 3
 *
 * _.result(object, 'a[0].b.c2');
 * // => 4
 *
 * _.result(object, 'a[0].b.c3', 'default');
 * // => 'default'
 *
 * _.result(object, 'a[0].b.c3', _.constant('default'));
 * // => 'default'
 */
function result(o, s, m) {
    s = r(s, o);
    var j = -1,
        p = s.length;
    if (!p) {
        p = 1;
        o = void 0
    }
    while (++j < p) {
        var e = null == o ? void 0 : o[t(s[j])];
        if (void 0 === e) {
            j = p;
            e = m
        }
        o = i(e) ? e.call(o) : e
    }
    return o
}
export default result;

//# sourceMappingURL=result.js.map