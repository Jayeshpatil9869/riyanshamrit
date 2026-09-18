import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_arrayMap.js";
import "./isArray.js";
import {
    b as r
} from "./_/c8f2469a.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import i from "./isObject.js";
import "./toNumber.js";
import "./toFinite.js";
import t from "./toInteger.js";
import "./_/43b5d56d.js";
import "./_/17fb905d.js";
import o from "./toString.js";
import "./_/1d34989e.js";
import {
    c as s
} from "./_/16393db3.js";
import {
    h as e
} from "./_/1386403c.js";
import {
    s as a
} from "./_/0b311353.js";
import "./_baseProperty.js";
import m from "./isRegExp.js";
import {
    s as p
} from "./_/5430d57b.js";
var f = 30,
    j = "...";
var n = /\w*$/;
/**
 * Truncates `string` if it's longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission
 * string which defaults to "...".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to truncate.
 * @param {Object} [options={}] The options object.
 * @param {number} [options.length=30] The maximum string length.
 * @param {string} [options.omission='...'] The string to indicate text is omitted.
 * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
 * @returns {string} Returns the truncated string.
 * @example
 *
 * _.truncate('hi-diddly-ho there, neighborino');
 * // => 'hi-diddly-ho there, neighbo...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': ' '
 * });
 * // => 'hi-diddly-ho there,...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'length': 24,
 *   'separator': /,? +/
 * });
 * // => 'hi-diddly-ho there...'
 *
 * _.truncate('hi-diddly-ho there, neighborino', {
 *   'omission': ' [...]'
 * });
 * // => 'hi-diddly-ho there, neig [...]'
 */
function truncate(l, c) {
    var d = f,
        _ = j;
    if (i(c)) {
        var b = "separator" in c ? c.separator : b;
        d = "length" in c ? t(c.length) : d;
        _ = "omission" in c ? r(c.omission) : _
    }
    l = o(l);
    var v = l.length;
    if (e(l)) {
        var g = a(l);
        v = g.length
    }
    if (d >= v) return l;
    var u = d - p(_);
    if (u < 1) return _;
    var x = g ? s(g, 0, u).join("") : l.slice(0, u);
    if (void 0 === b) return x + _;
    g && (u += x.length - u);
    if (m(b)) {
        if (l.slice(u).search(b)) {
            var h, y = x;
            b.global || (b = RegExp(b.source, o(n.exec(b)) + "g"));
            b.lastIndex = 0;
            while (h = b.exec(y)) var O = h.index;
            x = x.slice(0, void 0 === O ? u : O)
        }
    } else if (l.indexOf(r(b), u) != u) {
        var I = x.lastIndexOf(b);
        I > -1 && (x = x.slice(0, I))
    }
    return x + _
}
export default truncate;

//# sourceMappingURL=truncate.js.map