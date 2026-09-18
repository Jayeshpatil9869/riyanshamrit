import {
    S as r
} from "./9bf895a3.js";
import o from "../isSymbol.js";
import t from "../_arrayMap.js";
import i from "../isArray.js";
var a = 1 / 0;
var s = r ? r.prototype : void 0,
    n = s ? s.toString : void 0;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(r) {
    if ("string" == typeof r) return r;
    if (i(r)) return t(r, baseToString) + "";
    if (o(r)) return n ? n.call(r) : "";
    var s = r + "";
    return "0" == s && 1 / r == -a ? "-0" : s
}
export {
    baseToString as b
};

//# sourceMappingURL=c8f2469a.js.map