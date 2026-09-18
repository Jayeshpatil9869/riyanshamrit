import r from "../isObject.js";
import {
    i as o
} from "./98062778.js";
import {
    a as t
} from "./60d30700.js";
import {
    c as i
} from "./0f88f209.js";
import {
    t as s
} from "./b669c81f.js";
/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(e, f, a, m) {
    if (!r(e)) return e;
    f = i(f, e);
    var p = -1,
        n = f.length,
        c = n - 1,
        j = e;
    while (null != j && ++p < n) {
        var u = s(f[p]),
            b = a;
        if ("__proto__" === u || "constructor" === u || "prototype" === u) return e;
        if (p != c) {
            var v = j[u];
            b = m ? m(v, u, j) : void 0;
            void 0 === b && (b = r(v) ? v : o(f[p + 1]) ? [] : {})
        }
        t(j, u, b);
        j = j[u]
    }
    return e
}
export {
    baseSet as b
};

//# sourceMappingURL=6c34ab6b.js.map