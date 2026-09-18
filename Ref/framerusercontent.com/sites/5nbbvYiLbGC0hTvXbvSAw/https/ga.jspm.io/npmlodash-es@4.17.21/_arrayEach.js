/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(a, r) {
    var e = -1,
        l = null == a ? 0 : a.length;
    while (++e < l)
        if (false === r(a[e], e, a)) break;
    return a
}
export default arrayEach;

//# sourceMappingURL=_arrayEach.js.map