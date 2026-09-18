var a = Object.prototype;
var e = a.hasOwnProperty;
/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(a, r) {
    return null != a && e.call(a, r)
}
export default baseHas;

//# sourceMappingURL=_baseHas.js.map