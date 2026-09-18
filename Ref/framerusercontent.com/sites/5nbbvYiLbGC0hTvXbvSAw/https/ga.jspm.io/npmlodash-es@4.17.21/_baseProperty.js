/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(r) {
    return function(e) {
        return null == e ? void 0 : e[r]
    }
}
export default baseProperty;

//# sourceMappingURL=_baseProperty.js.map