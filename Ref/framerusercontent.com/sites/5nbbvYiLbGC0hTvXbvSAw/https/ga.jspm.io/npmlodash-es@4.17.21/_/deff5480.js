import r from "../eq.js";
/**
 * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseSortedUniq(e, t) {
    var a = -1,
        i = e.length,
        n = 0,
        o = [];
    while (++a < i) {
        var s = e[a],
            b = t ? t(s) : s;
        if (!a || !r(b, f)) {
            var f = b;
            o[n++] = 0 === s ? 0 : s
        }
    }
    return o
}
export {
    baseSortedUniq as b
};

//# sourceMappingURL=deff5480.js.map