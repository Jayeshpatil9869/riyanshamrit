import "./_/f08a6ffe.js";
import "./_/9bf895a3.js";
import "./isObject.js";
import t from "./identity.js";
import "./isFunction.js";
import "./_/ccff797b.js";
import "./_/e9d6e250.js";
import "./_/703e5e28.js";
import {
    a as s
} from "./_/ceaffabe.js";
import "./constant.js";
import "./_/198d994d.js";
import o from "./_overRest.js";
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(r, e) {
    return s(o(r, e, t), r + "")
}
export default baseRest;

//# sourceMappingURL=_baseRest.js.map