import {
    S as t
} from "./9bf895a3.js";
import a from "../isArray.js";
import r from "../isArguments.js";
import {
    a as e
} from "./7100b469.js";
var s = t ? t.isConcatSpreadable : void 0;
/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(t) {
    return a(t) || r(t) || !!(s && t && t[s])
}
/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(t, a, r, s, n) {
    var i = -1,
        o = t.length;
    r || (r = isFlattenable);
    n || (n = []);
    while (++i < o) {
        var l = t[i];
        a > 0 && r(l) ? a > 1 ? baseFlatten(l, a - 1, r, s, n) : e(n, l) : s || (n[n.length] = l)
    }
    return n
}
export {
    baseFlatten as b
};

//# sourceMappingURL=4175b908.js.map