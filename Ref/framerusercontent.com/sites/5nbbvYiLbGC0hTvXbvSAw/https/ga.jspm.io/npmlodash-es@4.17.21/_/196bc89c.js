import r from "../isObject.js";
import {
    i as e
} from "./98062778.js";
import t from "../eq.js";
import i from "../isArrayLike.js";
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(s, o, a) {
    if (!r(a)) return false;
    var m = typeof o;
    return !!("number" == m ? i(a) && e(o, a.length) : "string" == m && o in a) && t(a[o], s)
}
export {
    isIterateeCall as i
};

//# sourceMappingURL=196bc89c.js.map