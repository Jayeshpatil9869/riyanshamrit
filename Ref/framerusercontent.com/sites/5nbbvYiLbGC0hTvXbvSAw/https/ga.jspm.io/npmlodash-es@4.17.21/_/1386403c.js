var f = "\\ud800-\\udfff",
    u = "\\u0300-\\u036f",
    e = "\\ufe20-\\ufe2f",
    a = "\\u20d0-\\u20ff",
    d = u + e + a,
    r = "\\ufe0e\\ufe0f";
var n = "\\u200d";
var t = RegExp("[" + n + f + d + r + "]");
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(f) {
    return t.test(f)
}
export {
    hasUnicode as h
};

//# sourceMappingURL=1386403c.js.map