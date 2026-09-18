import t from "../isSymbol.js";
import r from "../isArray.js";
import {
    s
} from "./6d63bab0.js";
import o from "../toString.js";
var i = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    e = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(s, o) {
    if (r(s)) return false;
    var a = typeof s;
    return !("number" != a && "symbol" != a && "boolean" != a && null != s && !t(s)) || (e.test(s) || !i.test(s) || null != o && s in Object(o))
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(t, i) {
    return r(t) ? t : isKey(t, i) ? [t] : s(o(t))
}
export {
    castPath as c, isKey as i
};

//# sourceMappingURL=0f88f209.js.map