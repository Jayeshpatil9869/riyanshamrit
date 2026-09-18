import e from "../isArray.js";
import r from "../isObject.js";
import s from "../isFunction.js";
import i from "../_copyArray.js";
import {
    b as o
} from "./5e6974a5.js";
import f from "../eq.js";
import t from "../isArguments.js";
import a from "../isBuffer.js";
import m from "../isTypedArray.js";
import n from "../keysIn.js";
import p from "../isPlainObject.js";
import {
    S as j
} from "./0b247f18.js";
import {
    b as l,
    a as u,
    i as b
} from "./78e9d69b.js";
import {
    b as g
} from "./5f448d66.js";
import c from "../isArrayLikeObject.js";
import v from "../toPlainObject.js";
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(e, r, s) {
    (void 0 !== s && !f(e[r], s) || void 0 === s && !(r in e)) && o(e, r, s)
}
/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(e, r) {
    if (("constructor" !== r || "function" !== typeof e[r]) && "__proto__" != r) return e[r]
}
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(o, f, n, j, g, d, M) {
    var y = safeGet(o, n),
        A = safeGet(f, n),
        _ = M.get(A);
    if (_) assignMergeValue(o, n, _);
    else {
        var G = d ? d(y, A, n + "", o, f, M) : void 0;
        var O = void 0 === G;
        if (O) {
            var V = e(A),
                k = !V && a(A),
                D = !V && !k && m(A);
            G = A;
            if (V || k || D)
                if (e(y)) G = y;
                else if (c(y)) G = i(y);
            else if (k) {
                O = false;
                G = l(A, true)
            } else if (D) {
                O = false;
                G = u(A, true)
            } else G = [];
            else if (p(A) || t(A)) {
                G = y;
                t(y) ? G = v(y) : r(y) && !s(y) || (G = b(A))
            } else O = false
        }
        if (O) {
            M.set(A, G);
            g(G, A, j, d, M);
            M.delete(A)
        }
        assignMergeValue(o, n, G)
    }
}
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(e, s, i, o, f) {
    e !== s && g(s, (function(t, a) {
        f || (f = new j);
        if (r(t)) baseMergeDeep(e, s, a, i, baseMerge, o, f);
        else {
            var m = o ? o(safeGet(e, a), t, a + "", e, s, f) : void 0;
            void 0 === m && (m = t);
            assignMergeValue(e, a, m)
        }
    }), n)
}
export {
    baseMerge as b
};

//# sourceMappingURL=ef42d5a5.js.map