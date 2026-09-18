import e from "../toFinite.js";
import {
    i as o
} from "./196bc89c.js";
import r from "../_baseRange.js";
/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(t) {
    return function(i, n, a) {
        a && "number" != typeof a && o(i, n, a) && (n = a = void 0);
        i = e(i);
        if (void 0 === n) {
            n = i;
            i = 0
        } else n = e(n);
        a = void 0 === a ? i < n ? 1 : -1 : e(a);
        return r(i, n, a, t)
    }
}
export {
    createRange as c
};

//# sourceMappingURL=a5c2b89d.js.map