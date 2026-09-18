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
import r from "./eq.js";
import "./_overRest.js";
import t from "./_baseRest.js";
import "./isLength.js";
import "./isArrayLike.js";
import {
    i
} from "./_/196bc89c.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import s from "./keysIn.js";
var o = Object.prototype;
var e = o.hasOwnProperty;
/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var m = t((function(t, m) {
    t = Object(t);
    var p = -1;
    var j = m.length;
    var a = j > 2 ? m[2] : void 0;
    a && i(m[0], m[1], a) && (j = 1);
    while (++p < j) {
        var f = m[p];
        var c = s(f);
        var _ = -1;
        var v = c.length;
        while (++_ < v) {
            var d = c[_];
            var n = t[d];
            (void 0 === n || r(n, o[d]) && !e.call(t, d)) && (t[d] = f[d])
        }
    }
    return t
}));
export default m;

//# sourceMappingURL=defaults.js.map