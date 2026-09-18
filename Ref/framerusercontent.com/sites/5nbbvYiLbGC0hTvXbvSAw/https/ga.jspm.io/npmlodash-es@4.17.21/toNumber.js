import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import r from "./isSymbol.js";
import "./_/2a83f3a2.js";
import {
    b as t
} from "./_/399d274a.js";
import e from "./isObject.js";
var i = NaN;
var f = /^[-+]0x[0-9a-f]+$/i;
var o = /^0b[01]+$/i;
var a = /^0o[0-7]+$/i;
var s = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(m) {
    if ("number" == typeof m) return m;
    if (r(m)) return i;
    if (e(m)) {
        var p = "function" == typeof m.valueOf ? m.valueOf() : m;
        m = e(p) ? p + "" : p
    }
    if ("string" != typeof m) return 0 === m ? m : +m;
    m = t(m);
    var u = o.test(m);
    return u || a.test(m) ? s(m.slice(2), u ? 2 : 8) : f.test(m) ? i : +m
}
export default toNumber;

//# sourceMappingURL=toNumber.js.map