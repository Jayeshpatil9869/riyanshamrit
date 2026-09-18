var t = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(e) {
    var n = e.length;
    while (n-- && t.test(e.charAt(n)));
    return n
}
export {
    trimmedEndIndex as t
};

//# sourceMappingURL=2a83f3a2.js.map