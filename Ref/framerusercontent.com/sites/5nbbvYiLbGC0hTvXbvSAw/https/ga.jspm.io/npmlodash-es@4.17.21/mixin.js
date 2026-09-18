import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isArray.js";
import r from "./isObject.js";
import i from "./isFunction.js";
import s from "./_copyArray.js";
import t from "./_arrayEach.js";
import "./_/98062778.js";
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
import o from "./keys.js";
import {
    a as m
} from "./_/7100b469.js";
import "./_arrayFilter.js";
import {
    b as p
} from "./_/610b799f.js";
/**
 * Adds all own enumerable string keyed function properties of a source
 * object to the destination object. If `object` is a function, then methods
 * are added to its prototype as well.
 *
 * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
 * avoid conflicts caused by modifying the original.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {Function|Object} [object=lodash] The destination object.
 * @param {Object} source The object of functions to add.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
 * @returns {Function|Object} Returns `object`.
 * @example
 *
 * function vowels(string) {
 *   return _.filter(string, function(v) {
 *     return /[aeiou]/i.test(v);
 *   });
 * }
 *
 * _.mixin({ 'vowels': vowels });
 * _.vowels('fred');
 * // => ['e']
 *
 * _('fred').vowels().value();
 * // => ['e']
 *
 * _.mixin({ 'vowels': vowels }, { 'chain': false });
 * _('fred').vowels();
 * // => ['e']
 */
function mixin(_, a, j) {
    var e = o(a),
        n = p(a, e);
    var f = !(r(j) && "chain" in j) || !!j.chain,
        c = i(_);
    t(n, (function(r) {
        var i = a[r];
        _[r] = i;
        c && (_.prototype[r] = function() {
            var r = this.__chain__;
            if (f || r) {
                var t = _(this.__wrapped__),
                    o = t.__actions__ = s(this.__actions__);
                o.push({
                    func: i,
                    args: arguments,
                    thisArg: _
                });
                t.__chain__ = r;
                return t
            }
            return i.apply(_, m([this.value()], arguments))
        })
    }));
    return _
}
export default mixin;

//# sourceMappingURL=mixin.js.map