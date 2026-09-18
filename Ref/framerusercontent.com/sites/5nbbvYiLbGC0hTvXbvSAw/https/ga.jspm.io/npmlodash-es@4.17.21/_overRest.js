import {
    a as r
} from "./_/703e5e28.js";
var e = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(t, a, n) {
    a = e(void 0 === a ? t.length - 1 : a, 0);
    return function() {
        var o = arguments,
            i = -1,
            h = e(o.length - a, 0),
            v = Array(h);
        while (++i < h) v[i] = o[a + i];
        i = -1;
        var l = Array(a + 1);
        while (++i < a) l[i] = o[i];
        l[a] = n(v);
        return r(t, this, l)
    }
}
export default overRest;

//# sourceMappingURL=_overRest.js.map