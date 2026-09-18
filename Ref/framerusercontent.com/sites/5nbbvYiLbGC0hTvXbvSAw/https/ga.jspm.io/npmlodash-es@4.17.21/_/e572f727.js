import r from "../keys.js";
import {
    S as a
} from "./0b247f18.js";
import {
    b as e
} from "./d971f180.js";
import {
    i as t
} from "./7e89d739.js";
var i = 1,
    s = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(r, t, f, n) {
    var o = f.length,
        l = o,
        u = !n;
    if (null == r) return !l;
    r = Object(r);
    while (o--) {
        var v = f[o];
        if (u && v[2] ? v[1] !== r[v[0]] : !(v[0] in r)) return false
    }
    while (++o < l) {
        v = f[o];
        var h = v[0],
            m = r[h],
            c = v[1];
        if (u && v[2]) {
            if (void 0 === m && !(h in r)) return false
        } else {
            var b = new a;
            if (n) var g = n(m, c, h, r, t, b);
            if (!(void 0 === g ? e(c, m, i | s, n, b) : g)) return false
        }
    }
    return true
}
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(a) {
    var e = r(a),
        i = e.length;
    while (i--) {
        var s = e[i],
            f = a[s];
        e[i] = [s, f, t(f)]
    }
    return e
}
export {
    baseIsMatch as b, getMatchData as g
};

//# sourceMappingURL=e572f727.js.map