/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(r, e, a) {
    var n = -1,
        t = null == r ? 0 : r.length;
    while (++n < t)
        if (a(e, r[n])) return true;
    return false
}
export {
    arrayIncludesWith as a
};

//# sourceMappingURL=3d95c57d.js.map