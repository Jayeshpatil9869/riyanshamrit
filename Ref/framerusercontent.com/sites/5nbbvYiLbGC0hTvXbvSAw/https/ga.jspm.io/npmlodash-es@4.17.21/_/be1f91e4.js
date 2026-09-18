import {
    b as e
} from "./1d34989e.js";
/**
 * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
 * without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
function baseWhile(r, a, i, s) {
    var t = r.length,
        b = s ? t : -1;
    while ((s ? b-- : ++b < t) && a(r[b], b, r));
    return i ? e(r, s ? 0 : b, s ? b + 1 : t) : e(r, s ? b + 1 : 0, s ? t : b)
}
export {
    baseWhile as b
};

//# sourceMappingURL=be1f91e4.js.map