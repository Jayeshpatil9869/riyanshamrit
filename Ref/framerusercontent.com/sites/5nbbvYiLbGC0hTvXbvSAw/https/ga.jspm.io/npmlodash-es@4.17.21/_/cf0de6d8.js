/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(e, r, a, n) {
    var u = -1,
        l = null == e ? 0 : e.length;
    n && l && (a = e[++u]);
    while (++u < l) a = r(a, e[u], u, e);
    return a
}
export {
    arrayReduce as a
};

//# sourceMappingURL=cf0de6d8.js.map