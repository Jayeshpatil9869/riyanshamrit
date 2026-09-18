import r from "../isSymbol.js";
import {
    b as e
} from "./c8f2469a.js";
var o = NaN;
/**
 * The base implementation of `_.toNumber` which doesn't ensure correct
 * conversions of binary, hexadecimal, or octal string values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 */
function baseToNumber(e) {
    return "number" == typeof e ? e : r(e) ? o : +e
}
/**
 * Creates a function that performs a mathematical operation on two values.
 *
 * @private
 * @param {Function} operator The function to perform the operation.
 * @param {number} [defaultValue] The value used for `undefined` arguments.
 * @returns {Function} Returns the new mathematical operation function.
 */
function createMathOperation(r, o) {
    return function(t, i) {
        var n;
        if (void 0 === t && void 0 === i) return o;
        void 0 !== t && (n = t);
        if (void 0 !== i) {
            if (void 0 === n) return i;
            if ("string" == typeof t || "string" == typeof i) {
                t = e(t);
                i = e(i)
            } else {
                t = baseToNumber(t);
                i = baseToNumber(i)
            }
            n = r(t, i)
        }
        return n
    }
}
export {
    createMathOperation as c
};

//# sourceMappingURL=4ae314ce.js.map