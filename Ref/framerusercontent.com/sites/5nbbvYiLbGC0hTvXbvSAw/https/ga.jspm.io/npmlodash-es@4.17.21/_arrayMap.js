/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(r, a) {
    var e = -1,
        l = null == r ? 0 : r.length,
        n = Array(l);
    while (++e < l) n[e] = a(r[e], e, r);
    return n
}
export default arrayMap;

//# sourceMappingURL=_arrayMap.js.map