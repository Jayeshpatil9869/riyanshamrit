import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import "./_/c8f2469a.js";
import u from "./toString.js";
var f = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(u) {
    return u.match(f) || []
}
var d = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(u) {
    return d.test(u)
}
var r = "\\ud800-\\udfff",
    o = "\\u0300-\\u036f",
    a = "\\ufe20-\\ufe2f",
    i = "\\u20d0-\\u20ff",
    x = o + a + i,
    t = "\\u2700-\\u27bf",
    e = "a-z\\xdf-\\xf6\\xf8-\\xff",
    n = "\\xac\\xb1\\xd7\\xf7",
    s = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
    c = "\\u2000-\\u206f",
    b = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    j = "A-Z\\xc0-\\xd6\\xd8-\\xde",
    m = "\\ufe0e\\ufe0f",
    p = n + s + c + b;
var v = "['’]",
    A = "[" + p + "]",
    z = "[" + x + "]",
    Z = "\\d+",
    h = "[" + t + "]",
    W = "[" + e + "]",
    _ = "[^" + r + p + Z + t + e + j + "]",
    g = "\\ud83c[\\udffb-\\udfff]",
    l = "(?:" + z + "|" + g + ")",
    S = "[^" + r + "]",
    y = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    D = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    E = "[" + j + "]",
    L = "\\u200d";
var R = "(?:" + W + "|" + _ + ")",
    T = "(?:" + E + "|" + _ + ")",
    w = "(?:" + v + "(?:d|ll|m|re|s|t|ve))?",
    M = "(?:" + v + "(?:D|LL|M|RE|S|T|VE))?",
    U = l + "?",
    $ = "[" + m + "]?",
    k = "(?:" + L + "(?:" + [S, y, D].join("|") + ")" + $ + U + ")*",
    H = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
    N = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
    O = $ + U + k,
    V = "(?:" + [h, y, D].join("|") + ")" + O;
var q = RegExp([E + "?" + W + "+" + w + "(?=" + [A, E, "$"].join("|") + ")", T + "+" + M + "(?=" + [A, E + R, "$"].join("|") + ")", E + "?" + R + "+" + w, E + "+" + M, N, H, Z, V].join("|"), "g");
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(u) {
    return u.match(q) || []
}
/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(f, d, r) {
    f = u(f);
    d = r ? void 0 : d;
    return void 0 === d ? hasUnicodeWord(f) ? unicodeWords(f) : asciiWords(f) : f.match(d) || []
}
export default words;

//# sourceMappingURL=words.js.map