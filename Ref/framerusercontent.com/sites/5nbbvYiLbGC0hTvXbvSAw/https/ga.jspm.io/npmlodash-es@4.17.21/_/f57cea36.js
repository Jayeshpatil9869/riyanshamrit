import e from "../_arrayMap.js";
import {
    a as r
} from "./ef6cf5be.js";
import {
    b as a
} from "./43b5d56d.js";
import {
    c as f,
    S as s
} from "./9b3b36d6.js";
import {
    a as i
} from "./3d95c57d.js";
var t = 200;
/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(n, o, l, m) {
    var p = -1,
        b = r,
        u = true,
        c = n.length,
        h = [],
        d = o.length;
    if (!c) return h;
    l && (o = e(o, a(l)));
    if (m) {
        b = i;
        u = false
    } else if (o.length >= t) {
        b = f;
        u = false;
        o = new s(o)
    }
    e: while (++p < c) {
        var j = n[p],
            v = null == l ? j : l(j);
        j = m || 0 !== j ? j : 0;
        if (u && v === v) {
            var g = d;
            while (g--)
                if (o[g] === v) continue e;
            h.push(j)
        } else b(o, v, m) || h.push(j)
    }
    return h
}
export {
    baseDifference as b
};

//# sourceMappingURL=f57cea36.js.map