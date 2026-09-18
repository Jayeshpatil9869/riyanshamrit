import r from "../_arrayMap.js";
import {
    a as t
} from "./703e5e28.js";
import o from "../_baseRest.js";
import {
    b as a
} from "./43b5d56d.js";
import {
    f as e
} from "./a1bc051a.js";
import {
    b as s
} from "./a6855e68.js";
/**
 * Creates a function like `_.over`.
 *
 * @private
 * @param {Function} arrayFunc The function to iterate over iteratees.
 * @returns {Function} Returns the new over function.
 */
function createOver(m) {
    return e((function(e) {
        e = r(e, a(s));
        return o((function(r) {
            var o = this;
            return m(e, (function(a) {
                return t(a, o, r)
            }))
        }))
    }))
}
export {
    createOver as c
};

//# sourceMappingURL=940c1ed9.js.map