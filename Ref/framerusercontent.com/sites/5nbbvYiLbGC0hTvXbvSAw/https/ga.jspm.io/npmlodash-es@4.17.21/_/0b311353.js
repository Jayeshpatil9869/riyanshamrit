import {
    h as u
} from "./1386403c.js";
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(u) {
    return u.split("")
}
var f = "\\ud800-\\udfff",
    r = "\\u0300-\\u036f",
    d = "\\ufe20-\\ufe2f",
    o = "\\u20d0-\\u20ff",
    a = r + d + o,
    i = "\\ufe0e\\ufe0f";
var n = "[" + f + "]",
    e = "[" + a + "]",
    c = "\\ud83c[\\udffb-\\udfff]",
    t = "(?:" + e + "|" + c + ")",
    s = "[^" + f + "]",
    y = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    A = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    T = "\\u200d";
var g = t + "?",
    p = "[" + i + "]?",
    v = "(?:" + T + "(?:" + [s, y, A].join("|") + ")" + p + g + ")*",
    j = p + g + v,
    m = "(?:" + [s + e + "?", e, y, A, n].join("|") + ")";
var b = RegExp(c + "(?=" + c + ")|" + m + j, "g");
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(u) {
    return u.match(b) || []
}
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(f) {
    return u(f) ? unicodeToArray(f) : asciiToArray(f)
}
export {
    stringToArray as s
};

//# sourceMappingURL=0b311353.js.map