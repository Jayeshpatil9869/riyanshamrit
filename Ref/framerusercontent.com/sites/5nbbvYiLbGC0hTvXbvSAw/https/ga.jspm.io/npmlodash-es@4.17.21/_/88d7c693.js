import {
    b as a
} from "./fc09277a.js";
var e = NaN;
/**
 * The base implementation of `_.mean` and `_.meanBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the mean.
 */
function baseMean(n, r) {
    var s = null == n ? 0 : n.length;
    return s ? a(n, r) / s : e
}
export {
    baseMean as b
};

//# sourceMappingURL=88d7c693.js.map