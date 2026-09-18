/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(e, a) {
    var r, i = -1,
        n = e.length;
    while (++i < n) {
        var o = a(e[i]);
        void 0 !== o && (r = void 0 === r ? o : r + o)
    }
    return r
}
export {
    baseSum as b
};

//# sourceMappingURL=fc09277a.js.map