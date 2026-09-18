import r from "../isArray.js";
import {
    i as s
} from "./98062778.js";
import t from "../isLength.js";
import i from "../isArguments.js";
import {
    c as o
} from "./0f88f209.js";
import {
    t as a
} from "./b669c81f.js";
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(f, m, e) {
    m = o(m, f);
    var n = -1,
        h = m.length,
        l = false;
    while (++n < h) {
        var p = a(m[n]);
        if (!(l = null != f && e(f, p))) break;
        f = f[p]
    }
    if (l || ++n != h) return l;
    h = null == f ? 0 : f.length;
    return !!h && t(h) && s(p, h) && (r(f) || i(f))
}
export {
    hasPath as h
};

//# sourceMappingURL=b37b231f.js.map