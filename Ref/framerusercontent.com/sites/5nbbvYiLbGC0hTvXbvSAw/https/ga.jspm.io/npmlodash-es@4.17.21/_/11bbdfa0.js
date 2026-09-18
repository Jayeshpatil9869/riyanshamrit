import r from "../isArrayLike.js";
import t from "../keys.js";
import {
    b as e
} from "./a6855e68.js";
/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} findIndexFunc The function to find the collection index.
 * @returns {Function} Returns the new find function.
 */
function createFind(i) {
    return function(n, o, a) {
        var c = Object(n);
        if (!r(n)) {
            var f = e(o, 3);
            n = t(n);
            o = function(r) {
                return f(c[r], r, c)
            }
        }
        var s = i(n, o, a);
        return s > -1 ? c[f ? n[s] : s] : void 0
    }
}
export {
    createFind as c
};

//# sourceMappingURL=11bbdfa0.js.map