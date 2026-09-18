/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(r) {
    return function(e) {
        return null == r ? void 0 : r[e]
    }
}
export {
    basePropertyOf as b
};

//# sourceMappingURL=8fb9d566.js.map