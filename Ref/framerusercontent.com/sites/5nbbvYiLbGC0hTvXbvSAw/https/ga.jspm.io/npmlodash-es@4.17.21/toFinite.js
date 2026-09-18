import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObjectLike.js";
import "./isSymbol.js";
import "./_/2a83f3a2.js";
import "./_/399d274a.js";
import "./isObject.js";
import t from "./toNumber.js";
var i = 1 / 0,
    r = 17976931348623157e292;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(o) {
    if (!o) return 0 === o ? o : 0;
    o = t(o);
    if (o === i || o === -i) {
        var e = o < 0 ? -1 : 1;
        return e * r
    }
    return o === o ? o : 0
}
export default toFinite;

//# sourceMappingURL=toFinite.js.map