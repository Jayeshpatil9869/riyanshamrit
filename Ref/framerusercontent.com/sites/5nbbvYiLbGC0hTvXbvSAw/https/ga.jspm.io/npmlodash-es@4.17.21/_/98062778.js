var e = 9007199254740991;
var n = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(r, t) {
    var s = typeof r;
    t = null == t ? e : t;
    return !!t && ("number" == s || "symbol" != s && n.test(r)) && r > -1 && r % 1 == 0 && r < t
}
export {
    isIndex as i
};

//# sourceMappingURL=98062778.js.map