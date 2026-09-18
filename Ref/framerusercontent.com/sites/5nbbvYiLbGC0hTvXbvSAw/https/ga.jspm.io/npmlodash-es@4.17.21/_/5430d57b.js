import {
    h as f
} from "./1386403c.js";
import u from "../_baseProperty.js";
/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
var e = u("length");
var d = "\\ud800-\\udfff",
    r = "\\u0300-\\u036f",
    i = "\\ufe20-\\ufe2f",
    n = "\\u20d0-\\u20ff",
    t = r + i + n,
    o = "\\ufe0e\\ufe0f";
var a = "[" + d + "]",
    s = "[" + t + "]",
    c = "\\ud83c[\\udffb-\\udfff]",
    v = "(?:" + s + "|" + c + ")",
    g = "[^" + d + "]",
    p = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    j = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    m = "\\u200d";
var z = v + "?",
    S = "[" + o + "]?",
    b = "(?:" + m + "(?:" + [g, p, j].join("|") + ")" + S + z + ")*",
    h = S + z + b,
    l = "(?:" + [g + s + "?", s, p, j, a].join("|") + ")";
var x = RegExp(c + "(?=" + c + ")|" + l + h, "g");
/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */
function unicodeSize(f) {
    var u = x.lastIndex = 0;
    while (x.test(f)) ++u;
    return u
}
/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */
function stringSize(u) {
    return f(u) ? unicodeSize(u) : e(u)
}
export {
    stringSize as s
};

//# sourceMappingURL=5430d57b.js.map