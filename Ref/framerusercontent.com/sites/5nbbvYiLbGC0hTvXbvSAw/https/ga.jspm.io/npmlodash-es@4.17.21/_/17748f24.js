import {
    r
} from "./f08a6ffe.js";
import e from "../isObject.js";
import a from "../toInteger.js";
import t from "../identity.js";
import {
    m as n,
    i,
    g as o
} from "./80a12b8f.js";
import {
    b as p
} from "./865f4d28.js";
import {
    a as c
} from "./703e5e28.js";
import s from "../_copyArray.js";
import {
    s as l,
    a as v
} from "./ceaffabe.js";
import h from "../_arrayEach.js";
import {
    a as u
} from "./ef6cf5be.js";
import {
    i as f
} from "./98062778.js";
/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var d = n ? function(r, e) {
    n.set(r, e);
    return r
} : t;
/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */
function createCtor(r) {
    return function() {
        var a = arguments;
        switch (a.length) {
            case 0:
                return new r;
            case 1:
                return new r(a[0]);
            case 2:
                return new r(a[0], a[1]);
            case 3:
                return new r(a[0], a[1], a[2]);
            case 4:
                return new r(a[0], a[1], a[2], a[3]);
            case 5:
                return new r(a[0], a[1], a[2], a[3], a[4]);
            case 6:
                return new r(a[0], a[1], a[2], a[3], a[4], a[5]);
            case 7:
                return new r(a[0], a[1], a[2], a[3], a[4], a[5], a[6])
        }
        var t = p(r.prototype),
            n = r.apply(t, a);
        return e(n) ? n : t
    }
}
var g = 1;
/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createBind(e, a, t) {
    var n = a & g,
        i = createCtor(e);

    function wrapper() {
        var a = this && this !== r && this instanceof wrapper ? i : e;
        return a.apply(n ? t : this, arguments)
    }
    return wrapper
}
var w = Math.max;
/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgs(r, e, a, t) {
    var n = -1,
        i = r.length,
        o = a.length,
        p = -1,
        c = e.length,
        s = w(i - o, 0),
        l = Array(c + s),
        v = !t;
    while (++p < c) l[p] = e[p];
    while (++n < o)(v || n < i) && (l[a[n]] = r[n]);
    while (s--) l[p++] = r[n++];
    return l
}
var m = Math.max;
/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */
function composeArgsRight(r, e, a, t) {
    var n = -1,
        i = r.length,
        o = -1,
        p = a.length,
        c = -1,
        s = e.length,
        l = m(i - p, 0),
        v = Array(l + s),
        h = !t;
    while (++n < l) v[n] = r[n];
    var u = n;
    while (++c < s) v[u + c] = e[c];
    while (++o < p)(h || n < i) && (v[u + a[o]] = r[n++]);
    return v
}
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */
function countHolders(r, e) {
    var a = r.length,
        t = 0;
    while (a--) r[a] === e && ++t;
    return t
}
/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var y = l(d);
var H = /\{\n\/\* \[wrapped with (.+)\] \*/,
    j = /,? & /;
/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */
function getWrapDetails(r) {
    var e = r.match(H);
    return e ? e[1].split(j) : []
}
var _ = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */
function insertWrapDetails(r, e) {
    var a = e.length;
    if (!a) return r;
    var t = a - 1;
    e[t] = (a > 1 ? "& " : "") + e[t];
    e = e.join(a > 2 ? ", " : " ");
    return r.replace(_, "{\n/* [wrapped with " + e + "] */\n")
}
var b = 1,
    A = 2,
    W = 8,
    C = 16,
    D = 32,
    R = 64,
    x = 128,
    M = 256,
    T = 512;
var E = [
    ["ary", x],
    ["bind", b],
    ["bindKey", A],
    ["curry", W],
    ["curryRight", C],
    ["flip", T],
    ["partial", D],
    ["partialRight", R],
    ["rearg", M]
];
/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */
function updateWrapDetails(r, e) {
    h(E, (function(a) {
        var t = "_." + a[0];
        e & a[1] && !u(r, t) && r.push(t)
    }));
    return r.sort()
}
/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */
function setWrapToString(r, e, a) {
    var t = e + "";
    return v(r, insertWrapDetails(t, updateWrapDetails(getWrapDetails(t), a)))
}
var S = 1,
    B = 2,
    P = 4,
    I = 8,
    K = 32,
    O = 64;
/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createRecurry(r, e, a, t, n, o, p, c, s, l) {
    var v = e & I,
        h = v ? p : void 0,
        u = v ? void 0 : p,
        f = v ? o : void 0,
        d = v ? void 0 : o;
    e |= v ? K : O;
    e &= ~(v ? O : K);
    e & P || (e &= ~(S | B));
    var g = [r, e, n, f, h, d, u, c, s, l];
    var w = a.apply(void 0, g);
    i(r) && y(w, g);
    w.placeholder = t;
    return setWrapToString(w, r, e)
}
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */
function getHolder(r) {
    var e = r;
    return e.placeholder
}
var k = Math.min;
/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */
function reorder(r, e) {
    var a = r.length,
        t = k(e.length, a),
        n = s(r);
    while (t--) {
        var i = e[t];
        r[t] = f(i, a) ? n[i] : void 0
    }
    return r
}
var q = "__lodash_placeholder__";
/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */
function replaceHolders(r, e) {
    var a = -1,
        t = r.length,
        n = 0,
        i = [];
    while (++a < t) {
        var o = r[a];
        if (o === e || o === q) {
            r[a] = q;
            i[n++] = a
        }
    }
    return i
}
var z = 1,
    F = 2,
    G = 8,
    J = 16,
    L = 128,
    N = 512;
/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createHybrid(e, a, t, n, i, o, p, c, s, l) {
    var v = a & L,
        h = a & z,
        u = a & F,
        f = a & (G | J),
        d = a & N,
        g = u ? void 0 : createCtor(e);

    function wrapper() {
        var w = arguments.length,
            m = Array(w),
            y = w;
        while (y--) m[y] = arguments[y];
        if (f) var H = getHolder(wrapper),
            j = countHolders(m, H);
        n && (m = composeArgs(m, n, i, f));
        o && (m = composeArgsRight(m, o, p, f));
        w -= j;
        if (f && w < l) {
            var _ = replaceHolders(m, H);
            return createRecurry(e, a, createHybrid, wrapper.placeholder, t, m, _, c, s, l - w)
        }
        var b = h ? t : this,
            A = u ? b[e] : e;
        w = m.length;
        c ? m = reorder(m, c) : d && w > 1 && m.reverse();
        v && s < w && (m.length = s);
        this && this !== r && this instanceof wrapper && (A = g || createCtor(A));
        return A.apply(b, m)
    }
    return wrapper
}
/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createCurry(e, a, t) {
    var n = createCtor(e);

    function wrapper() {
        var i = arguments.length,
            o = Array(i),
            p = i,
            s = getHolder(wrapper);
        while (p--) o[p] = arguments[p];
        var l = i < 3 && o[0] !== s && o[i - 1] !== s ? [] : replaceHolders(o, s);
        i -= l.length;
        if (i < t) return createRecurry(e, a, createHybrid, wrapper.placeholder, void 0, o, l, void 0, void 0, t - i);
        var v = this && this !== r && this instanceof wrapper ? n : e;
        return c(v, this, o)
    }
    return wrapper
}
var Q = 1;
/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */
function createPartial(e, a, t, n) {
    var i = a & Q,
        o = createCtor(e);

    function wrapper() {
        var a = -1,
            p = arguments.length,
            s = -1,
            l = n.length,
            v = Array(l + p),
            h = this && this !== r && this instanceof wrapper ? o : e;
        while (++s < l) v[s] = n[s];
        while (p--) v[s++] = arguments[++a];
        return c(h, i ? t : this, v)
    }
    return wrapper
}
var U = "__lodash_placeholder__";
var V = 1,
    X = 2,
    Y = 4,
    Z = 8,
    $ = 128,
    rr = 256;
var er = Math.min;
/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */
function mergeData(r, e) {
    var a = r[1],
        t = e[1],
        n = a | t,
        i = n < (V | X | $);
    var o = t == $ && a == Z || t == $ && a == rr && r[7].length <= e[8] || t == ($ | rr) && e[7].length <= e[8] && a == Z;
    if (!(i || o)) return r;
    if (t & V) {
        r[2] = e[2];
        n |= a & V ? 0 : Y
    }
    var p = e[3];
    if (p) {
        var c = r[3];
        r[3] = c ? composeArgs(c, p, e[4]) : p;
        r[4] = c ? replaceHolders(r[3], U) : e[4]
    }
    p = e[5];
    if (p) {
        c = r[5];
        r[5] = c ? composeArgsRight(c, p, e[6]) : p;
        r[6] = c ? replaceHolders(r[5], U) : e[6]
    }
    p = e[7];
    p && (r[7] = p);
    t & $ && (r[8] = null == r[8] ? e[8] : er(r[8], e[8]));
    null == r[9] && (r[9] = e[9]);
    r[0] = e[0];
    r[1] = n;
    return r
}
var ar = "Expected a function";
var tr = 1,
    nr = 2,
    ir = 8,
    or = 16,
    pr = 32,
    cr = 64;
var sr = Math.max;
/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */
function createWrap(r, e, t, n, i, p, c, s) {
    var l = e & nr;
    if (!l && "function" != typeof r) throw new TypeError(ar);
    var v = n ? n.length : 0;
    if (!v) {
        e &= ~(pr | cr);
        n = i = void 0
    }
    c = void 0 === c ? c : sr(a(c), 0);
    s = void 0 === s ? s : a(s);
    v -= i ? i.length : 0;
    if (e & cr) {
        var h = n,
            u = i;
        n = i = void 0
    }
    var f = l ? void 0 : o(r);
    var g = [r, e, t, n, i, h, u, p, c, s];
    f && mergeData(g, f);
    r = g[0];
    e = g[1];
    t = g[2];
    n = g[3];
    i = g[4];
    s = g[9] = void 0 === g[9] ? l ? 0 : r.length : sr(g[9] - v, 0);
    !s && e & (ir | or) && (e &= ~(ir | or));
    if (e && e != tr) w = e == ir || e == or ? createCurry(r, e, s) : e != pr && e != (tr | pr) || i.length ? createHybrid.apply(void 0, g) : createPartial(r, e, t, n);
    else var w = createBind(r, e, t);
    var m = f ? d : y;
    return setWrapToString(m(w, g), r, e)
}
export {
    createHybrid as a, createWrap as c, getHolder as g, replaceHolders as r
};

//# sourceMappingURL=17748f24.js.map