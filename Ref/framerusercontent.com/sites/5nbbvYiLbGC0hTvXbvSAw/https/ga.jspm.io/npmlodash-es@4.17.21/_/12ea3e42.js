import r from "../isArrayLike.js";
import {
    b as a
} from "./4b1fb593.js";
/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(o, s) {
    var t = -1,
        b = r(o) ? Array(o.length) : [];
    a(o, (function(r, a, o) {
        b[++t] = s(r, a, o)
    }));
    return b
}
export {
    baseMap as b
};

//# sourceMappingURL=12ea3e42.js.map