/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(r, a) {
    var e = -1,
        l = null == r ? 0 : r.length,
        t = 0,
        n = [];
    while (++e < l) {
        var i = r[e];
        a(i, e, r) && (n[t++] = i)
    }
    return n
}
export default arrayFilter;

//# sourceMappingURL=_arrayFilter.js.map