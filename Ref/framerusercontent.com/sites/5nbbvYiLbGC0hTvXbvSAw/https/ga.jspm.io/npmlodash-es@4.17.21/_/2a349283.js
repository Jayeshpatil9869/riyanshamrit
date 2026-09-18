import r from "../noop.js";
import {
    a as e
} from "./ef6cf5be.js";
import {
    S as s
} from "./573cd97d.js";
import {
    c as a,
    S as f
} from "./9b3b36d6.js";
import {
    s as i
} from "./f01ae9b5.js";
import {
    a as n
} from "./3d95c57d.js";
var o = 1 / 0;
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var t = s && 1 / i(new s([, -0]))[1] == o ? function(r) {
    return new s(r)
} : r;
var m = 200;
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(r, s, o) {
    var p = -1,
        u = e,
        l = r.length,
        h = true,
        b = [],
        c = b;
    if (o) {
        h = false;
        u = n
    } else if (l >= m) {
        var v = s ? null : t(r);
        if (v) return i(v);
        h = false;
        u = a;
        c = new f
    } else c = s ? [] : b;
    r: while (++p < l) {
        var j = r[p],
            d = s ? s(j) : j;
        j = o || 0 !== j ? j : 0;
        if (h && d === d) {
            var w = c.length;
            while (w--)
                if (c[w] === d) continue r;
            s && c.push(d);
            b.push(j)
        } else if (!u(c, d, o)) {
            c !== b && c.push(d);
            b.push(j)
        }
    }
    return b
}
export {
    baseUniq as b
};

//# sourceMappingURL=2a349283.js.map