import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import "./isObject.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import {
    a as r
} from "./_/60d30700.js";
import {
    c as s
} from "./_/8dfaf20e.js";
import "./_overRest.js";
import "./_baseRest.js";
import "./isLength.js";
import t from "./isArrayLike.js";
import "./_/196bc89c.js";
import {
    c as i
} from "./_/218be937.js";
import {
    i as o
} from "./_/df9293ee.js";
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
import m from "./keys.js";
var p = Object.prototype;
var j = p.hasOwnProperty;
/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var e = i((function(i, p) {
    if (o(p) || t(p)) s(p, m(p), i);
    else
        for (var e in p) j.call(p, e) && r(i, e, p[e])
}));
export default e;

//# sourceMappingURL=assign.js.map