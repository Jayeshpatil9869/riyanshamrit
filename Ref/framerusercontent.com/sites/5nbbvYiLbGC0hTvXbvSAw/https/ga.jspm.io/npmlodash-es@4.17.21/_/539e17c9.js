import {
    c as s
} from "./0f88f209.js";
import {
    t
} from "./b669c81f.js";
import r from "../last.js";
import {
    p as o
} from "./29a9b3d3.js";
/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(e, a) {
    a = s(a, e);
    e = o(e, a);
    return null == e || delete e[t(r(a))]
}
export {
    baseUnset as b
};

//# sourceMappingURL=539e17c9.js.map