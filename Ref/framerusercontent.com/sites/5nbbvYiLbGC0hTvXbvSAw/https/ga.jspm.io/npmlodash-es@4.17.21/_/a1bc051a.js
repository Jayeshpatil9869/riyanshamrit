import {
    a as t
} from "./ceaffabe.js";
import f from "../_overRest.js";
import o from "../flatten.js";
/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(r) {
    return t(f(r, void 0, o), r + "")
}
export {
    flatRest as f
};

//# sourceMappingURL=a1bc051a.js.map