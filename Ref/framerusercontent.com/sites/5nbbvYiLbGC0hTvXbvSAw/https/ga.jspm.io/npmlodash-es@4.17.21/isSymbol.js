import "./_/f08a6ffe.js";
import {
    b as o
} from "./_/9bf895a3.js";
import t from "./isObjectLike.js";
var f = "[object Symbol]";
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(m) {
    return "symbol" == typeof m || t(m) && o(m) == f
}
export default isSymbol;

//# sourceMappingURL=isSymbol.js.map