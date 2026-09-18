/**
 * A specialized version of `_.every` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if all elements pass the predicate check,
 *  else `false`.
 */
function arrayEvery(r, e) {
    var a = -1,
        t = null == r ? 0 : r.length;
    while (++a < t)
        if (!e(r[a], a, r)) return false;
    return true
}
export default arrayEvery;

//# sourceMappingURL=_arrayEvery.js.map