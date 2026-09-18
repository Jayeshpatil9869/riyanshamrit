/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(t, r) {
    return function(e) {
        return null != e && (e[t] === r && (void 0 !== r || t in Object(e)))
    }
}
export {
    matchesStrictComparable as m
};

//# sourceMappingURL=3cfb9cd3.js.map