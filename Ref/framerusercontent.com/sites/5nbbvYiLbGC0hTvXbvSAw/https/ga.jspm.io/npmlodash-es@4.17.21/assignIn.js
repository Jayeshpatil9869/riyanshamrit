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
import "./_/60d30700.js";
import {
    c as s
} from "./_/8dfaf20e.js";
import "./_overRest.js";
import "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/196bc89c.js";
import {
    c as i
} from "./_/218be937.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import t from "./keysIn.js";
/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
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
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var r = i((function(i, r) {
    s(r, t(r), i)
}));
export default r;

//# sourceMappingURL=assignIn.js.map