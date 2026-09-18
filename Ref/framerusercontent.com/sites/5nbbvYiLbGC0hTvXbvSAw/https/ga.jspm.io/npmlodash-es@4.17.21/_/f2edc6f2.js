import n from "../_baseIndexOf.js";
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the last unmatched string symbol.
 */
function charsEndIndex(e, r) {
    var a = e.length;
    while (a-- && n(r, e[a], 0) > -1);
    return a
}
export {
    charsEndIndex as c
};

//# sourceMappingURL=f2edc6f2.js.map