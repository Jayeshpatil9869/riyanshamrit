import "./_/f08a6ffe.js";
import {
    S as r
} from "./_/9bf895a3.js";
import "./isObjectLike.js";
import t from "./isArray.js";
import e from "./isObject.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/a68c036e.js";
import "./_/865f4d28.js";
import o from "./_copyArray.js";
import "./_/198d994d.js";
import a from "./_arrayEach.js";
import "./_/98062778.js";
import "./_/5e6974a5.js";
import "./eq.js";
import {
    a as c
} from "./_/60d30700.js";
import {
    c as s
} from "./_/8dfaf20e.js";
import "./isLength.js";
import "./isArrayLike.js";
import "./_/df9293ee.js";
import "./_/e524acca.js";
import "./isArguments.js";
import "./stubFalse.js";
import n from "./isBuffer.js";
import "./isTypedArray.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import "./_/d155b8cd.js";
import "./_/7953e050.js";
import "./_/48027737.js";
import i from "./keys.js";
import j from "./keysIn.js";
import "./_/7c57ec77.js";
import "./_/72487e58.js";
import "./_/7100b469.js";
import "./_/e52eecc0.js";
import {
    S as b
} from "./_/0b247f18.js";
import {
    b as m
} from "./_/c84dc829.js";
import {
    c as f,
    a as p,
    b as u,
    i as y
} from "./_/78e9d69b.js";
import "./_arrayFilter.js";
import "./stubArray.js";
import {
    g as l,
    a as d
} from "./_/7c293c91.js";
import {
    a as A,
    g as _
} from "./_/5f9acba5.js";
import {
    g as v
} from "./_/5cc66d2f.js";
import "./_/573cd97d.js";
import g from "./isMap.js";
import w from "./isSet.js";
/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(r, t) {
    return r && s(t, j(t), r)
}
/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(r, t) {
    return s(r, l(r), t)
}
/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(r, t) {
    return s(r, A(r), t)
}
var S = Object.prototype;
var I = S.hasOwnProperty;
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(r) {
    var t = r.length,
        e = new r.constructor(t);
    if (t && "string" == typeof r[0] && I.call(r, "index")) {
        e.index = r.index;
        e.input = r.input
    }
    return e
}
/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(r, t) {
    var e = t ? f(r.buffer) : r.buffer;
    return new r.constructor(e, r.byteOffset, r.byteLength)
}
var x = /\w*$/;
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(r) {
    var t = new r.constructor(r.source, x.exec(r));
    t.lastIndex = r.lastIndex;
    return t
}
var C = r ? r.prototype : void 0,
    F = C ? C.valueOf : void 0;
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(r) {
    return F ? Object(F.call(r)) : {}
}
var h = "[object Boolean]",
    E = "[object Date]",
    O = "[object Map]",
    U = "[object Number]",
    B = "[object RegExp]",
    D = "[object Set]",
    k = "[object String]",
    L = "[object Symbol]";
var M = "[object ArrayBuffer]",
    R = "[object DataView]",
    V = "[object Float32Array]",
    T = "[object Float64Array]",
    N = "[object Int8Array]",
    q = "[object Int16Array]",
    G = "[object Int32Array]",
    P = "[object Uint8Array]",
    W = "[object Uint8ClampedArray]",
    $ = "[object Uint16Array]",
    z = "[object Uint32Array]";
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(r, t, e) {
    var o = r.constructor;
    switch (t) {
        case M:
            return f(r);
        case h:
        case E:
            return new o(+r);
        case R:
            return cloneDataView(r, e);
        case V:
        case T:
        case N:
        case q:
        case G:
        case P:
        case W:
        case $:
        case z:
            return p(r, e);
        case O:
            return new o;
        case U:
        case k:
            return new o(r);
        case B:
            return cloneRegExp(r);
        case D:
            return new o;
        case L:
            return cloneSymbol(r)
    }
}
var H = 1,
    J = 2,
    K = 4;
var Q = "[object Arguments]",
    X = "[object Array]",
    Y = "[object Boolean]",
    Z = "[object Date]",
    rr = "[object Error]",
    tr = "[object Function]",
    er = "[object GeneratorFunction]",
    or = "[object Map]",
    ar = "[object Number]",
    cr = "[object Object]",
    sr = "[object RegExp]",
    nr = "[object Set]",
    ir = "[object String]",
    jr = "[object Symbol]",
    br = "[object WeakMap]";
var mr = "[object ArrayBuffer]",
    fr = "[object DataView]",
    pr = "[object Float32Array]",
    ur = "[object Float64Array]",
    yr = "[object Int8Array]",
    lr = "[object Int16Array]",
    dr = "[object Int32Array]",
    Ar = "[object Uint8Array]",
    _r = "[object Uint8ClampedArray]",
    vr = "[object Uint16Array]",
    gr = "[object Uint32Array]";
var wr = {};
wr[Q] = wr[X] = wr[mr] = wr[fr] = wr[Y] = wr[Z] = wr[pr] = wr[ur] = wr[yr] = wr[lr] = wr[dr] = wr[or] = wr[ar] = wr[cr] = wr[sr] = wr[nr] = wr[ir] = wr[jr] = wr[Ar] = wr[_r] = wr[vr] = wr[gr] = true;
wr[rr] = wr[tr] = wr[br] = false;
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(r, s, f, p, l, A) {
    var S, I = s & H,
        x = s & J,
        C = s & K;
    f && (S = l ? f(r, p, l, A) : f(r));
    if (void 0 !== S) return S;
    if (!e(r)) return r;
    var F = t(r);
    if (F) {
        S = initCloneArray(r);
        if (!I) return o(r, S)
    } else {
        var h = v(r),
            E = h == tr || h == er;
        if (n(r)) return u(r, I);
        if (h == cr || h == Q || E && !l) {
            S = x || E ? {} : y(r);
            if (!I) return x ? copySymbolsIn(r, baseAssignIn(S, r)) : copySymbols(r, m(S, r))
        } else {
            if (!wr[h]) return l ? r : {};
            S = initCloneByTag(r, h, I)
        }
    }
    A || (A = new b);
    var O = A.get(r);
    if (O) return O;
    A.set(r, S);
    w(r) ? r.forEach((function(t) {
        S.add(baseClone(t, s, f, t, r, A))
    })) : g(r) && r.forEach((function(t, e) {
        S.set(e, baseClone(t, s, f, e, r, A))
    }));
    var U = C ? x ? _ : d : x ? j : i;
    var B = F ? void 0 : U(r);
    a(B || r, (function(t, e) {
        if (B) {
            e = t;
            t = r[e]
        }
        c(S, e, baseClone(t, s, f, e, r, A))
    }));
    return S
}
export default baseClone;

//# sourceMappingURL=_baseClone.js.map