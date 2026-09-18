import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import r from "./isObject.js";
import "./isFunction.js";
import "./_/98062778.js";
import "./isLength.js";
import s from "./isArrayLike.js";
import {
    i as t
} from "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import {
    a as i
} from "./_/d155b8cd.js";
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(r) {
    var s = [];
    if (null != r)
        for (var t in Object(r)) s.push(t);
    return s
}
var e = Object.prototype;
var o = e.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(s) {
    if (!r(s)) return nativeKeysIn(s);
    var i = t(s),
        e = [];
    for (var n in s) "constructor" == n && (i || !o.call(s, n)) || e.push(n);
    return e
}
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(r) {
    return s(r) ? i(r, true) : baseKeysIn(r)
}
export default keysIn;

//# sourceMappingURL=keysIn.js.map