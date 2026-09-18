/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(e, r) {
    var a = -1,
        s = Array(e);
    while (++a < e) s[a] = r(a);
    return s
}
export {
    baseTimes as b
};

//# sourceMappingURL=e524acca.js.map