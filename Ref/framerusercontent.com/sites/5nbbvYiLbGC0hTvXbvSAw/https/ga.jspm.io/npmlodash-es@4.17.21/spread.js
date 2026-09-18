import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import t from "./toInteger.js";
import "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import {
    a as r
} from "./_/703e5e28.js";
import "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import "./_overRest.js";
import o from "./_baseRest.js";
import {
    a as i
} from "./_/7100b469.js";
import "./_/1d34989e.js";
import {
    c as s
} from "./_/16393db3.js";
var e = "Expected a function";
var m = Math.max;
/**
 * Creates a function that invokes `func` with the `this` binding of the
 * create function and an array of arguments much like
 * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
 *
 * **Note:** This method is based on the
 * [spread operator](https://mdn.io/spread_operator).
 *
 * @static
 * @memberOf _
 * @since 3.2.0
 * @category Function
 * @param {Function} func The function to spread arguments over.
 * @param {number} [start=0] The start position of the spread.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.spread(function(who, what) {
 *   return who + ' says ' + what;
 * });
 *
 * say(['fred', 'hello']);
 * // => 'fred says hello'
 *
 * var numbers = Promise.all([
 *   Promise.resolve(40),
 *   Promise.resolve(36)
 * ]);
 *
 * numbers.then(_.spread(function(x, y) {
 *   return x + y;
 * }));
 * // => a Promise of 76
 */
function spread(p, j) {
    if ("function" != typeof p) throw new TypeError(e);
    j = null == j ? 0 : m(t(j), 0);
    return o((function(t) {
        var o = t[j],
            e = s(t, 0, j);
        o && i(e, o);
        return r(p, this, e)
    }))
}
export default spread;

//# sourceMappingURL=spread.js.map