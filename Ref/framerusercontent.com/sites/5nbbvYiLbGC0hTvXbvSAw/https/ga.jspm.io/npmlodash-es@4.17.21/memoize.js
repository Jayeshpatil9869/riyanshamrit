import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./eq.js";
import {
    M as e
} from "./_/7c57ec77.js";
import "./_/72487e58.js";
var t = "Expected a function";
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(i, o) {
    if ("function" != typeof i || null != o && "function" != typeof o) throw new TypeError(t);
    var memoized = function() {
        var e = arguments,
            t = o ? o.apply(this, e) : e[0],
            r = memoized.cache;
        if (r.has(t)) return r.get(t);
        var c = i.apply(this, e);
        memoized.cache = r.set(t, c) || r;
        return c
    };
    memoized.cache = new(memoize.Cache || e);
    return memoized
}
memoize.Cache = e;
export default memoize;

//# sourceMappingURL=memoize.js.map