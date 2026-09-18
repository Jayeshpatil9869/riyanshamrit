import r from "../_baseIndexOf.js";
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(a, n) {
    var e = null == a ? 0 : a.length;
    return !!e && r(a, n, 0) > -1
}
export {
    arrayIncludes as a
};

//# sourceMappingURL=ef6cf5be.js.map