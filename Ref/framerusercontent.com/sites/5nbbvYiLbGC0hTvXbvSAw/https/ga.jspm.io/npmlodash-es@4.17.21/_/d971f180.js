import {
    S as e
} from "./9bf895a3.js";
import r from "../isObjectLike.js";
import a from "../isArray.js";
import t from "../eq.js";
import s from "../isBuffer.js";
import f from "../isTypedArray.js";
import {
    U as n,
    S as o
} from "./0b247f18.js";
import {
    a as i
} from "./7c293c91.js";
import {
    g as u
} from "./5cc66d2f.js";
import {
    S as c,
    c as l
} from "./9b3b36d6.js";
import {
    m as b
} from "./6703045c.js";
import {
    s as v
} from "./f01ae9b5.js";
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(e, r) {
    var a = -1,
        t = null == e ? 0 : e.length;
    while (++a < t)
        if (r(e[a], a, e)) return true;
    return false
}
var m = 1,
    p = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(e, r, a, t, s, f) {
    var n = a & m,
        o = e.length,
        i = r.length;
    if (o != i && !(n && i > o)) return false;
    var u = f.get(e);
    var b = f.get(r);
    if (u && b) return u == r && b == e;
    var v = -1,
        j = true,
        y = a & p ? new c : void 0;
    f.set(e, r);
    f.set(r, e);
    while (++v < o) {
        var g = e[v],
            h = r[v];
        if (t) var w = n ? t(h, g, v, r, e, f) : t(g, h, v, e, r, f);
        if (void 0 !== w) {
            if (w) continue;
            j = false;
            break
        }
        if (y) {
            if (!arraySome(r, (function(e, r) {
                    if (!l(y, r) && (g === e || s(g, e, a, t, f))) return y.push(r)
                }))) {
                j = false;
                break
            }
        } else if (!(g === h || s(g, h, a, t, f))) {
            j = false;
            break
        }
    }
    f.delete(e);
    f.delete(r);
    return j
}
var j = 1,
    y = 2;
var g = "[object Boolean]",
    h = "[object Date]",
    w = "[object Error]",
    d = "[object Map]",
    q = "[object Number]",
    O = "[object RegExp]",
    S = "[object Set]",
    A = "[object String]",
    _ = "[object Symbol]";
var E = "[object ArrayBuffer]",
    k = "[object DataView]";
var B = e ? e.prototype : void 0,
    I = B ? B.valueOf : void 0;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(e, r, a, s, f, o, i) {
    switch (a) {
        case k:
            if (e.byteLength != r.byteLength || e.byteOffset != r.byteOffset) return false;
            e = e.buffer;
            r = r.buffer;
        case E:
            return !(e.byteLength != r.byteLength || !o(new n(e), new n(r)));
        case g:
        case h:
        case q:
            return t(+e, +r);
        case w:
            return e.name == r.name && e.message == r.message;
        case O:
        case A:
            return e == r + "";
        case d:
            var u = b;
        case S:
            var c = s & j;
            u || (u = v);
            if (e.size != r.size && !c) return false;
            var l = i.get(e);
            if (l) return l == r;
            s |= y;
            i.set(e, r);
            var m = equalArrays(u(e), u(r), s, f, o, i);
            i.delete(e);
            return m;
        case _:
            if (I) return I.call(e) == I.call(r)
    }
    return false
}
var L = 1;
var D = Object.prototype;
var T = D.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(e, r, a, t, s, f) {
    var n = a & L,
        o = i(e),
        u = o.length,
        c = i(r),
        l = c.length;
    if (u != l && !n) return false;
    var b = u;
    while (b--) {
        var v = o[b];
        if (!(n ? v in r : T.call(r, v))) return false
    }
    var m = f.get(e);
    var p = f.get(r);
    if (m && p) return m == r && p == e;
    var j = true;
    f.set(e, r);
    f.set(r, e);
    var y = n;
    while (++b < u) {
        v = o[b];
        var g = e[v],
            h = r[v];
        if (t) var w = n ? t(h, g, v, r, e, f) : t(g, h, v, e, r, f);
        if (!(void 0 === w ? g === h || s(g, h, a, t, f) : w)) {
            j = false;
            break
        }
        y || (y = "constructor" == v)
    }
    if (j && !y) {
        var d = e.constructor,
            q = r.constructor;
        d == q || !("constructor" in e) || !("constructor" in r) || "function" == typeof d && d instanceof d && "function" == typeof q && q instanceof q || (j = false)
    }
    f.delete(e);
    f.delete(r);
    return j
}
var x = 1;
var z = "[object Arguments]",
    P = "[object Array]",
    M = "[object Object]";
var N = Object.prototype;
var R = N.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(e, r, t, n, i, c) {
    var l = a(e),
        b = a(r),
        v = l ? P : u(e),
        m = b ? P : u(r);
    v = v == z ? M : v;
    m = m == z ? M : m;
    var p = v == M,
        j = m == M,
        y = v == m;
    if (y && s(e)) {
        if (!s(r)) return false;
        l = true;
        p = false
    }
    if (y && !p) {
        c || (c = new o);
        return l || f(e) ? equalArrays(e, r, t, n, i, c) : equalByTag(e, r, v, t, n, i, c)
    }
    if (!(t & x)) {
        var g = p && R.call(e, "__wrapped__"),
            h = j && R.call(r, "__wrapped__");
        if (g || h) {
            var w = g ? e.value() : e,
                d = h ? r.value() : r;
            c || (c = new o);
            return i(w, d, t, n, c)
        }
    }
    if (!y) return false;
    c || (c = new o);
    return equalObjects(e, r, t, n, i, c)
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(e, a, t, s, f) {
    return e === a || (null == e || null == a || !r(e) && !r(a) ? e !== e && a !== a : baseIsEqualDeep(e, a, t, s, baseIsEqual, f))
}
export {
    arraySome as a, baseIsEqual as b
};

//# sourceMappingURL=d971f180.js.map