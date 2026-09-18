import {
    b as r
} from "./4175b908.js";
import {
    b as a
} from "./f57cea36.js";
import {
    b as o
} from "./2a349283.js";
/**
 * The base implementation of methods like `_.xor`, without support for
 * iteratee shorthands, that accepts an array of arrays to inspect.
 *
 * @private
 * @param {Array} arrays The arrays to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of values.
 */
function baseXor(e, s, t) {
    var b = e.length;
    if (b < 2) return b ? o(e[0]) : [];
    var i = -1,
        f = Array(b);
    while (++i < b) {
        var m = e[i],
            n = -1;
        while (++n < b) n != i && (f[i] = a(f[i] || m, e[n], s, t))
    }
    return o(r(f, 1), s, t)
}
export {
    baseXor as b
};

//# sourceMappingURL=15b69d86.js.map