/**
 * The base implementation of methods like `_.findKey` and `_.findLastKey`,
 * without support for iteratee shorthands, which iterates over `collection`
 * using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFindKey(e, n, r) {
    var a;
    r(e, (function(e, r, i) {
        if (n(e, r, i)) {
            a = r;
            return false
        }
    }));
    return a
}
export {
    baseFindKey as b
};

//# sourceMappingURL=79a1b287.js.map