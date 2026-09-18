import "./_/f08a6ffe.js";
import {
    b as t
} from "./_/9bf895a3.js";
import r from "./isObjectLike.js";
import "./_/7953e050.js";
import {
    g as e
} from "./_/e52eecc0.js";
var o = "[object Object]";
var a = Function.prototype,
    c = Object.prototype;
var i = a.toString;
var n = c.hasOwnProperty;
var f = i.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(a) {
    if (!r(a) || t(a) != o) return false;
    var c = e(a);
    if (null === c) return true;
    var s = n.call(c, "constructor") && c.constructor;
    return "function" == typeof s && s instanceof s && i.call(s) == f
}
export default isPlainObject;

//# sourceMappingURL=isPlainObject.js.map