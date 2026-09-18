import r from "../_baseIndexOf.js";
/**
 * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(t, e) {
    var a = -1,
        n = t.length;
    while (++a < n && r(e, t[a], 0) > -1);
    return a
}
export {
    charsStartIndex as c
};

//# sourceMappingURL=321ee86c.js.map