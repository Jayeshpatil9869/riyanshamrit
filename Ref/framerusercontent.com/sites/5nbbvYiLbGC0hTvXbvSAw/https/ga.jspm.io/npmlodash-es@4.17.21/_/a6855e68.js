import r from "../isArray.js";
import t from "../identity.js";
import {
    b as o
} from "./2d110264.js";
import {
    b as e
} from "./2aa8b3e7.js";
import s from "../property.js";
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(a) {
    return "function" == typeof a ? a : null == a ? t : "object" == typeof a ? r(a) ? e(a[0], a[1]) : o(a) : s(a)
}
export {
    baseIteratee as b
};

//# sourceMappingURL=a6855e68.js.map