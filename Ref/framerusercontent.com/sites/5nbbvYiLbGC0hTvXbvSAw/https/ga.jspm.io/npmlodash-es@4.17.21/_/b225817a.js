/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(e, n, r, i) {
    var t = e.length,
        a = r + (i ? 1 : -1);
    while (i ? a-- : ++a < t)
        if (n(e[a], a, e)) return a;
    return -1
}
export {
    baseFindIndex as b
};

//# sourceMappingURL=b225817a.js.map