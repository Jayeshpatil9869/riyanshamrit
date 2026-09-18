/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */
function baseReduce(e, n, u, a, c) {
    c(e, (function(e, c, s) {
        u = a ? (a = false, e) : n(u, e, c, s)
    }));
    return u
}
export {
    baseReduce as b
};

//# sourceMappingURL=31bf9ac3.js.map