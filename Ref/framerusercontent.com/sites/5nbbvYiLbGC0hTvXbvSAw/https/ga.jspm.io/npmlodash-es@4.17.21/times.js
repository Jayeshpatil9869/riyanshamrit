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
import {
    b as r
} from "./_/e524acca.js";
import {
    c as i
} from "./_/cd8e8b5d.js";
var o = 9007199254740991;
var m = 4294967295;
var s = Math.min;
/**
 * Invokes the iteratee `n` times, returning an array of the results of
 * each invocation. The iteratee is invoked with one argument; (index).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 * @example
 *
 * _.times(3, String);
 * // => ['0', '1', '2']
 *
 *  _.times(4, _.constant(0));
 * // => [0, 0, 0, 0]
 */
function times(e, a) {
    e = t(e);
    if (e < 1 || e > o) return [];
    var j = m,
        p = s(e, m);
    a = i(a);
    e -= m;
    var f = r(p, a);
    while (++j < e) a(j);
    return f
}
export default times;

//# sourceMappingURL=times.js.map